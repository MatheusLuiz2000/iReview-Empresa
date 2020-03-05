import { Request, Response } from 'express';
import path from 'path';
import TedService from '../services/TedService';
import axios from 'axios';
class TedController {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };

  testes = (req, res) => {
    res.sendFile(path.resolve('./__tests__/coverage/lcov-report/index.html'));
  };

  public async listar(req: Request, res: Response) {
    const listar = await TedService.listar();

    return res.status(listar.status).json({
      data: listar.dados
    });
  };

  public async listarById(req: Request, res: Response) {
    const { id } = req.params;

    const listarById = await TedService.listarById(id);

    return res.status(listarById.status).json({
      data: listarById.dados
    });
  };

  public async criarTed(req: Request, res: Response) {
 
    const { cliente_id , operacao_id } = req.body;
    const criarTed = await TedService.criarTed(cliente_id, operacao_id);
    
    return res.status(criarTed.status).json({
      data: criarTed
    })
  }

  public async gerarTed(req: Request, res: Response) {
    const { teste } = req.body;

    const gerarTed = await TedService.gerarTed(teste);

    return res.status(gerarTed.status).json({
      data: gerarTed.dados
    });
  }

  public async leituraRetornoTed(req: Request, res: Response) {
    const { link_s3 } = req.body;

    const leituraTed = await TedService.lerTed(link_s3);

    return res.status(leituraTed).json();
  }

  public async teste(req: Request, res: Response) {
    const conteudoLinhas = await axios.get("https://adiantesa-dev.s3.amazonaws.com/uploads/retorno/deposito/2019/10/REMESSA16860_1809201946.RET.20190918141820410");
    console.log(conteudoLinhas);
  }
  health = (req, res) => {
    res.status(200).send('OK'); 
  };
}

export default new TedController();
