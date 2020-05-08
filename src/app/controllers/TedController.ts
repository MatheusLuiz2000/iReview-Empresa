import { Request, Response } from 'express';
import path from 'path';
import moment from 'moment';
import TedService from '../services/TedService';

import proximoDiaUtil from '../util/proximoDiaUtil';

import FinnetApi from '../../api/Finnet';

class TedController {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };

  testes = (req, res) => {
    res.sendFile(path.resolve('./__tests__/coverage/lcov-report/index.html'));
  };

  health = (req, res) => {
    res.status(200).send('OK');
  };

  // Listar todas as Teds
  public async listar(req: Request, res: Response) {
    const listar = await TedService.listar();

    return res.status(listar.status).json({
      data: listar.dados
    });
  }

  // Listar as teds com ID
  public async listarById(req: Request, res: Response) {
    const { id } = req.params;

    const listarById = await TedService.listarById(id);

    return res.status(listarById.status).json({
      data: listarById.dados
    });
  }

  public async listarConsolidada(req, res) {
    const { id } = req.params;
    const { status, data } = await TedService.listarConsolidada(id);

    return res.status(status).json(data);
  }

  // Criacao do registro de Ted
  public async criarTed(req: Request, res: Response) {
    const { cliente_id, operacao_id, valor_transferencia } = req.body;

    const criarTed = await TedService.criarTed(
      cliente_id,
      operacao_id,
      valor_transferencia
    );

    return res.status(criarTed.status).json({
      data: {
        dados: criarTed.dados,
        mensagem: criarTed.mensagem
      }
    });
  }

  // Geracao do arquivo de TED
  public async gerarTed(req: Request, res: Response) {
    const { banco } = req.headers;

    if (!banco)
      return res
        .status(400)
        .json({ mensagem: 'É nescessário enviar o Banco nos headers' });

    if (banco !== 'itau' && banco !== 'outros')
      return res
        .status(400)
        .json({ mensagem: 'O banco deve ser itau ou outros' });

    const gerarTed = await TedService.gerarTed(banco);
    return res.status(gerarTed.status).json({
      data: gerarTed.dados
    });
  }

  // Leitura do retorno do ted
  public async leituraRetornoTed(req: Request, res: Response) {
    const { link_s3 } = req.body;
    let leituras = [];

    const links = await FinnetApi.leituraRetorno();

    if (links.status === 204)
      return res
        .status(200)
        .json({ mensagem: 'Nenhum arquivo para processar.' });

    if (links.status !== 200)
      return res
        .status(500)
        .json({ mensagem: 'Erro na comunicacao com a Finnet' });

    for (let link of links.data) {
      let retorno = await TedService.lerTed(link.link_s3);
      leituras.push(retorno);
    }

    return res.status(200).json(leituras);
  }
}

export default new TedController();
