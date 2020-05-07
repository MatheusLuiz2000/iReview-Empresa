import moment_timezone from 'moment-timezone';
import moment from 'moment';
import Log from 'log-gcb';
import { Op } from 'sequelize';
import Sqs from 'sqs-gcb';
import uniqid from 'uniqid';
import geraDadosTed from '../helpers/remessa/geraDadosTed';
import Cliente_api from '../../api/Cliente';
import Ted_model from '../models/Ted';
import validaInformacoesTed from '../helpers/remessa/validacoesTed';
import Pendencia_ted from '../models/Pendencia_ted';
import montarArquivo from '../helpers/remessa/montarArquivo';
import processaRetorno from '../helpers/retorno/processaRetorno';
import Retorno_ted from '../models/Retorno_ted';

class TedService {
  public async listar() {
    const buscaTeds = await Ted_model.findAll();

    if (!buscaTeds) {
      return {
        status: 400,
        mensagem: 'Não foi possivel localizar as TEDS do sistema.'
      };
    }

    return {
      status: 200,
      dados: buscaTeds
    };
  }

  public async listarById(id) {
    const buscaTedsById = await Ted_model.findOne({
      where: {
        id
      }
    });

    if (!buscaTedsById) {
      return {
        status: 400,
        mensagem: 'Não foi possivel localizar a TED'
      };
    }

    return {
      status: 200,
      dados: buscaTedsById
    };
  }

  public async listarConsolidada(id) {
    const consulta = await Retorno_ted.findOne({
      where: {
        ted_id: id,
        status_banco: 1
      }
    });

    if (!consulta) {
      return {
        status: 200,
        data: {
          consolidada: false
        }
      };
    }
    return {
      status: 200,
      data: {
        consolidada: true
      }
    };
  }

  public async criarTed(cliente_id, operacao_id, valor_transferencia) {
    valor_transferencia = parseFloat(valor_transferencia);

    const buscaDadosCliente = await Cliente_api.consulta(cliente_id);

    if (buscaDadosCliente.status !== 200) {
      return {
        status: 400,
        mensagem:
          'Não foi possível recuperar os dados do Cliente. Tente novamente!'
      };
    }

    const validacoesTed = await validaInformacoesTed(buscaDadosCliente);

    if (validacoesTed.status !== 200) {
      Log.erro(
        { headers: { nulo: true } },
        'Erro ao Inserir Solicitação de criação de Ted',
        {
          status: validacoesTed.status,
          dados: validacoesTed.dados,
          mensagem:
            'Preencha todos os campos fornecidos para finalizar a transferência'
        }
      );
      return {
        status: validacoesTed.status,
        dados: validacoesTed.dados,
        mensagem:
          'Preencha todos os campos fornecidos para finalizar a transferência'
      };
    }

    const usoEmpresa = uniqid();

    await Ted_model.create({
      cliente_id,
      operacao_id,
      valor_transferencia,
      identificacao: usoEmpresa,
      codigo_banco: buscaDadosCliente.data.banco[0].codigo_banco,
      agencia: buscaDadosCliente.data.banco[0].agencia,
      conta: buscaDadosCliente.data.banco[0].conta,
      digito: buscaDadosCliente.data.banco[0].digito,
      tipo_conta: buscaDadosCliente.data.banco[0].tipo_conta
    });

    return {
      status: 200,
      mensagem: 'TED criada com sucesso!'
    };
  }

  public async gerarTed() {
    moment_timezone().tz('America/Fortaleza');

    let InformacoesTed = await Ted_model.findAll({
      where: {
        remessa_id: null,
        desativado_em: null
      }
    });

    if (InformacoesTed.length <= 0) {
      Log.alerta(
        process.env.HEADERS_GLOBAIS,
        'Não há nenhuma ted para ser criada',
        InformacoesTed
      );

      return {
        status: 200,
        dados: {}
      };
    }

    const RetornoTedLog = new Array();
    const DadosTeds = new Array();
    const tempoAgora = new Date();
    const tedsConfirmadas = new Array();

    let contadorTeds = 1;
    let contadorLinha = 1;
    let valorTotalPagamentoArquivo = 0;

    for (let element of InformacoesTed) {
      const buscaDadosCliente = await Cliente_api.consulta(
        element.cliente_id,
        false
      );

      if (buscaDadosCliente.status !== 200) {
        RetornoTedLog.push({
          operacao_id: element.operacao_id,
          cliente_id: element.cliente_id,
          motivo: 'Localizar o cliente',
          tipo: 'nao-realizada',
          mensagem: 'Não foi possivel encontrar o cliente'
        });

        continue;
      }

      buscaDadosCliente.data.banco = [
        {
          codigo_banco: element.codigo_banco,
          agencia: element.dataValues.agencia,
          conta: element.dataValues.conta,
          digito: element.dataValues.digito,
          tipo_conta: element.dataValues.digito
        }
      ];

      // if (
      //   tempoAgora.getHours() > 15 &&
      //   buscaDadosCliente.data.banco.tipo_bancos_id !== '341'
      // ) {
      //   RetornoTedLog.push({
      //     operacao_id: element.operacao_id,
      //     cliente_id: element.cliente_id,
      //     motivo: 'Ted deve ser efetuada manualmente',
      //     tipo: 'nao-realizada',
      //     mensagem: 'Ted deve ser efetuada manualmente'
      //   });

      //   continue;
      // }

      const validacoesTed = await validaInformacoesTed(buscaDadosCliente);

      if (validacoesTed.status !== 200) {
        Pendencia_ted.create({
          ted_id: element.id,
          cliente_id: element.cliente_id,
          pendencias: validacoesTed.dados
        });

        RetornoTedLog.push({
          operacao_id: element.operacao_id,
          cliente_id: element.cliente_id,
          validacoes: validacoesTed.dados,
          motivo: 'Validaçoes',
          tipo: 'nao-realizada',
          mensagem:
            'Não foi possivel efetuar a criação da TED devido que as validações não deixaram passar.'
        });

        continue;
      }

      const objFinal = {
        cliente: buscaDadosCliente.data
      };

      Ted_model.update(
        {
          json_dados: objFinal
        },
        {
          where: {
            id: element.id
          }
        }
      );

      const geraDados = await geraDadosTed(
        buscaDadosCliente.data,
        element,
        contadorLinha
      );

      DadosTeds.push(geraDados.dados);
      contadorTeds++;
      contadorLinha = parseInt(geraDados.linha);

      tedsConfirmadas.push(element.id);

      valorTotalPagamentoArquivo += parseFloat(element.valor_transferencia);
    }

    if (RetornoTedLog.length > 0) {
      Log.cron(
        process.env.HEADERS_GLOBAIS,
        'Informações da CRON de TED',
        RetornoTedLog
      );
    }

    // Montar o arquivo;
    if (DadosTeds.length > 0) {
      await montarArquivo(
        DadosTeds,
        contadorTeds,
        valorTotalPagamentoArquivo,
        tedsConfirmadas
      );
    }

    return {
      status: 200,
      dados: {
        mensagem: 'Execução realizada com sucesso!',
        retorno: RetornoTedLog
      }
    };
  }

  public async lerTed(link_s3) {
    const processarRetorno = await processaRetorno(link_s3);
    return processarRetorno;
  }
}

export default new TedService();
