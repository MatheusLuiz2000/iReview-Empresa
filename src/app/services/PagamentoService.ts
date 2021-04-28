import { Request, Response } from 'express';
import path from 'path';
import moment from 'moment';

// Pagar.me
import logError from '../util/logError';
import Transacoes from '../models/Transacoes';
import Status from '../models/Status';

// Helps
import dadosPagarme from '../helpers/dadosPagarme';
import TiposPagamento from '../models/TiposPagamento';
import salvarTransacao from '../helpers/salvarTransacao';
import queryParams from '../util/queryParams';
import conexaoPargarme from '../helpers/conexaoPargarme';
import criarCartaoID from '../helpers/criarCartaoID';
import HistoricoTransacoes from '../models/HistoricoTransacoes';
import CartoesClientes from '../models/CartoesClientes';

class PagamentoService {
  listar = async query => {
    const buscaTransacao = await Transacoes.findAll(queryParams(query));

    return {
      status: 200,
      data: buscaTransacao
    };
  };

  transacao = async dados => {
    const client = await conexaoPargarme();

    if (!client.status) {
      logError('Erro ao estabelecer conexão', client.data);

      return {
        status: 400,
        data: client.data
      };
    }

    try {
      if (dados.tipo_pagamento === 'credit_card') {
        const clientCard = await criarCartaoID(client, dados);

        if (!clientCard) {
          return {
            status: 400,
            data: 'Erro ao criar cartão'
          };
        }

        dados.clientCard = clientCard.id;
        dados.cartao_id = clientCard.cartao_id;
      }

      const createTransaction = await client.data.transactions.create(
        dadosPagarme(dados)
      );

      console.log('transacao', createTransaction);

      // Salva a transacao no banco
      await salvarTransacao(dados, createTransaction);

      return {
        status: 200,
        data: createTransaction
      };
    } catch (error) {
      logError('Erro ao transação', error);

      return {
        status: 400,
        data: error
      };
    }
  };

  postBack = async dados => {
    const payload = Object.fromEntries(new URLSearchParams(dados.payload));

    if (!dados) {
      return {
        status: 400
      };
    }

    const buscaTransacao = await Transacoes.findOne({
      where: {
        transacao_id: payload.id
      }
    });

    if (!buscaTransacao) {
      logError('Erro ao encontrar transacao', buscaTransacao);

      return {
        status: 400
      };
    }

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

    await HistoricoTransacoes.create({
      transacao_id: buscaTransacao.id,
      json: payload
    });

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
}

export default new PagamentoService();
