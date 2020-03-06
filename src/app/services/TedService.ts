import Ted_model from '../models/Ted';
import Cliente_api from '../../api/Cliente';
import moment_timezone from 'moment-timezone';
import moment from 'moment';
import geraDadosTed from '../helpers/remessa/geraDadosTed';
import Log from 'log-gcb';
import { Op } from 'sequelize';
import funcoes from '../util/funcoes';
import validaInformacoesTed from '../helpers/remessa/validacoesTed';
import Pendencia_ted from '../models/Pendencia_ted';
import montarArquivo from '../helpers/remessa/montarArquivo';
import processaRetorno from '../helpers/retorno/processaRetorno';

class TedService {
  public async listar() {

    const buscaTeds = await Ted_model.findAll();

    if (!buscaTeds) {
      return {
        status: 400,
        mensagem: 'Não foi possivel localizar as TEDS do sistema.'
      }
    }

    return {
      status: 200,
      dados: buscaTeds
    }

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
      }
    }

    return {
      status: 200,
      dados: buscaTedsById
    }
  }

  public async criarTed(cliente_id, operacao_id) {

    const buscaDadosCliente = await Cliente_api.consulta(cliente_id);

    if (buscaDadosCliente.status !== 200) {
      return {
        status: 400,
        mensagem: "Não foi possível recuperar os dados do Cliente. Tente novamente!"
      }
    }

    const validacoesTed = await validaInformacoesTed(buscaDadosCliente);

    if (validacoesTed.status !== 200) {
      return {
        status: validacoesTed.status,
        dados: validacoesTed.dados,
        mensagem: 'Preencha todos os campos fornecidos para finalizar a transferência'
      }
    }

    const criarTed = await Ted_model.create({
      cliente_id,
      operacao_id,
    });

    if (!criarTed) {

      Log.enviar({
        nivel: `erro`,
        mensagem: `Nao foi possivel criar a TED do cliente de id ${cliente_id} e operacao ${operacao_id}`,
        detalhes: `${criarTed}`
      });

      return {
        status: 400,
        mensagem: 'Ocorreu um erro ao registrar a TED. Tente novamente!'
      }
    }

    return {
      status: 200,
      mensagem: "TED criada com sucesso!"
    }
  }

  public async gerarTed() {
    moment_timezone().tz("America/Fortaleza");

    let InformacoesTed = await Ted_model.findAll({
      where: {
        remessa_id: {
          [Op.eq]: null
        }
      }
    });

    if (InformacoesTed.length <= 0) {
      Log.enviar({
        nivel: `info`,
        mensagem: `Não há nenhuma ted para ser criada no dia ${moment().format("dd/mm/yyyy")} e no horario ${moment().format('LTS')}`,
        detalhes: `${InformacoesTed}`
      });

      return {
        status: 200,
        dados: {}
      }
    }

    const RetornoTedLog = new Array();
    const DadosTeds = new Array();
    const tempoAgora = new Date();

    let contadorTeds = 1;
    let contadorLinha = 1;

    for (let element of InformacoesTed) {

      const buscaDadosCliente = await Cliente_api.consulta(element.cliente_id);

      if (buscaDadosCliente.status !== 200) {

        RetornoTedLog.push({
          operacao_id: element.operacao_id,
          cliente_id: element.cliente_id,
          motivo: 'Localizar o cliente',
          tipo: 'nao-realizada',
          mensagem: "Não foi possivel encontrar o cliente"
        });

        continue;
      }

      if (tempoAgora.getHours() > 15 && buscaDadosCliente.resposta.data.Banco.codigo_banco !== "341") {

        RetornoTedLog.push({
          operacao_id: element.operacao_id,
          cliente_id: element.cliente_id,
          motivo: "Ted deve ser efetuada manualmente",
          tipo: 'nao-realizada',
          mensagem: "Ted deve ser efetuada manualmente"
        });

        continue;
      }

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
          mensagem: "Não foi possivel efetuar a criação da TED devido que as validações não deixaram passar."
        });

        continue;
      }

      const geraDados = await geraDadosTed(buscaDadosCliente.resposta.data, contadorLinha);

      DadosTeds.push(geraDados.dados);
      contadorTeds++;
      contadorLinha = parseInt(geraDados.linha);
    }

    if (RetornoTedLog.length > 0) {
      Log.enviar({
        nivel: `info`,
        mensagem: `Informações da CRON de TED realizada no dia ${moment().format("dd/mm/yyyy")} e no horario ${moment().format('LTS')}`,
        detalhes: `${RetornoTedLog}`
      });
    }

    //Montar o arquivo;
    if (DadosTeds.length > 0) {
      await montarArquivo(DadosTeds, contadorTeds, "1.00");
    }

    return {
      status: 200,
      dados: {
        mensagem: "Execução realizada com sucesso!",
        retorno: RetornoTedLog
      }
    }
  }

  public async lerTed(link_s3) {
    const processarRetorno = await processaRetorno(link_s3);
    return processarRetorno;
  }
}


export default new TedService();