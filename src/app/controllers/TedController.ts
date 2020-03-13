import { Request, Response } from 'express';
import path from 'path';
import TedService from '../services/TedService';

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
    const gerarTed = await TedService.gerarTed();
    return res.status(gerarTed.status).json({
      data: gerarTed.dados
    });
  }

  // Leitura do retorno do ted
  public async leituraRetornoTed(req: Request, res: Response) {
    const { link_s3 } = req.body;

    const leituraTed = await TedService.lerTed(link_s3);

    return res.status(leituraTed).json();
  }
}

export default new TedController();
