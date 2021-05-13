import { Request, Response } from 'express';
import path from 'path';
import moment from 'moment';

// Pagar.me
import logError from '../util/logError';
import Transacoes from '../models/Transacoes';
import Status from '../models/Status';

// Helps
import dadosPagarme from '../helpers/dadosPagarme';
import dadosPagarmePix from '../helpers/dadosPagarmePix';
import salvarTransacao from '../helpers/salvarTransacao';
import queryParams from '../util/queryParams';
import conexaoPargarme from '../helpers/conexaoPargarme';
import criarCartaoID from '../helpers/criarCartaoID';
import enviarEmail from '../helpers/enviarEmail';
import HistoricoTransacoes from '../models/HistoricoTransacoes';
import CartoesClientes from '../models/CartoesClientes';
import EAD from '../../api/EAD';
import retornoTransacao from '../util/retornoTransacao';

class PagamentoService {
  listar = async query => {
    const buscaTransacao = await Transacoes.findOne(queryParams(query));

    return {
      status: 200,
      data: buscaTransacao
    };
  };

  transacao = async dados => {
    const regitraCliente = await EAD.registraUsuario(dados);

    dados.cliente_id = regitraCliente.data.user.id;
    dados.customer.id_proprio = regitraCliente.data.user.id.toString();

    const client = await conexaoPargarme();

    if (!client.status) {
      logError('Erro ao estabelecer conexão', client.data);

      return {
        status: 400,
        data: 'Erro ao realizar a transação! Tenta novamente'
      };
    }

    try {
      if (dados.tipo_pagamento === 'credit_card') {
        const clientCard = await criarCartaoID(client, dados);

        if (!clientCard) {
          return {
            status: 400,
            data: 'O cartão não é válido. Valide os dados fornecidos!'
          };
        }

        dados.clientCard = clientCard.id;
        dados.cartao_id = clientCard.cartao_id;
      }

      const dadosPagar =
        dados.tipo_pagamento === 'credit_card'
          ? dadosPagarme(dados)
          : dadosPagarmePix(dados);

      const createTransaction = await client.data.transactions.create(
        dadosPagar
      );

      logError('Transacao', createTransaction);

      console.log('transacao', createTransaction);

      if (createTransaction.status === 'paid') {
        await EAD.efetivaMatricula(
          regitraCliente.data.user.id,
          dados.tipo_curso,
          dados.produto_id
        );
      }

      // Salva a transacao no banco
      await salvarTransacao(dados, createTransaction);

      return {
        status: 200,
        data: retornoTransacao(dados.tipo_pagamento, createTransaction)
      };
    } catch (error) {
      console.log('error transacao', error.response.errors);
      logError('Erro ao transação', error);

      return {
        status: 400,
        data: 'Erro ao tentar realizar a transação! Tenta novamente(2)'
      };
    }
  };

  postBack = async dados => {
    console.log('req body', dados);
    const payload = Object.fromEntries(new URLSearchParams(dados.payload));

    if (!dados) {
      return {
        status: 400
      };
    }

    console.log(payload);

    const buscaTransacao = await Transacoes.findOne({
      where: {
        transacao_id: payload.id
      }
    });

    console.log(buscaTransacao);

    if (!buscaTransacao) {
      logError('Erro ao encontrar transacao', {});

      return {
        status: 400
      };
    }

    const buscaHistoricoTransacao = await HistoricoTransacoes.findOne({
      where: {
        transacao_id: buscaTransacao.id
      }
    });

    if (!buscaHistoricoTransacao) {
      logError('Erro ao encontrar historico transacao', buscaTransacao);

      return {
        status: 400
      };
    }

    console.log('aqui!!');

    if (payload.current_status === 'paid' && buscaTransacao.status_id !== 2) {
      await EAD.efetivaMatricula(
        buscaTransacao.cliente_id,
        buscaTransacao.tipo_curso,
        buscaTransacao.produto_id
      );

      await enviarEmail(
        1,
        buscaTransacao.id,
        buscaHistoricoTransacao.json_dados.customer.email,
        buscaHistoricoTransacao.json_dados.item.titulo_item,
        buscaHistoricoTransacao.json_dados.numero_parcelas,
        parseFloat(buscaHistoricoTransacao.json_dados.valor_parcelas).toFixed(
          2
        ),
        parseFloat(
          buscaHistoricoTransacao.json_dados.total_operacao_currency
        ).toFixed(2),
        buscaHistoricoTransacao.json_dados.customer.nome,
        ''
      );
    }

    console.log('aqui3!!');

    const buscaStatus = await Status.findOne({
      where: {
        nome: payload.current_status
      }
    });

    await Transacoes.update(
      {
        status_id: buscaStatus.id
      },
      {
        where: {
          id: buscaTransacao.id
        }
      }
    );

    console.log('aqui4!!');

    await HistoricoTransacoes.create({
      transacao_id: buscaTransacao.id,
      json: payload,
      json_dados: buscaHistoricoTransacao.json_dados
    });

    console.log('aqui5!!');

    return {
      status: 200,
      data: 'Atualizado com sucesso!'
    };
  };

  parcelamentoSemLimites = async dados => {
    const data2 = Object.fromEntries(new URLSearchParams(dados.payload));

    const buscaTransacao = await Transacoes.findOne({
      where: {
        transacao_id: data2.id
      },
      include: {
        model: CartoesClientes,
        as: 'cartoes'
      }
    });

    if (!buscaTransacao) {
      return {
        status: 400,
        data: 'Não foi encontrada transação'
      };
    }

    const client = await conexaoPargarme();

    if (!client.status) {
      logError(
        'Erro ao estabelecer conexão com Parcelamento Sem Limites',
        client.data
      );

      return {
        status: 400,
        data: client.data
      };
    }

    try {
      const createTransaction = await client.data.subscriptions.create({
        plan_id: 573348,
        payment_method: 'credit_card',
        card_id: buscaTransacao.cartoes.card_id,
        postback_url: process.env.URL_POST_BACK,
        customer: {
          email: data2['transaction[customer][email]'],
          name: data2['transaction[customer][name]'],
          document_number: data2['transaction[customer][documents][0][number]']
        }
      });

      // Salva a transacao no banco
      await salvarTransacao(
        {
          cliente_id: buscaTransacao.cliente_id,
          produto_id: buscaTransacao.produto_id,
          total_operacao: buscaTransacao.total_operacao,
          numero_parcelas: buscaTransacao.numero_parcelas,
          valor_parcelas: buscaTransacao.valor_parcelas,
          pagamento_facilitado: true,
          plataforma: buscaTransacao.plataforma_id,
          tipo_pagamento: 'credit_card',
          cartao_id: buscaTransacao.cartao_id
        },
        createTransaction.current_transaction
      );

      return {
        status: 200,
        data: createTransaction.current_transaction
      };
    } catch (err) {
      console.log('erro', err);
      logError('Erro ao criar assinatura', err);

      return {
        status: 400,
        data: err
      };
    }
  };

  envioEmail = async dados => {
    // const teste = await EAD.efetivaMatricula(299, 2, 10);
    // console.log(teste);
  };
}

export default new PagamentoService();
