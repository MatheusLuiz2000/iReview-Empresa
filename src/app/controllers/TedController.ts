// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import path from 'path';

class TedController {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };

  testes = (req, res) => {
    res.sendFile(path.resolve('./__tests__/coverage/lcov-report/index.html'));
  };

  hello = async (req: Request, res: Response) => {
    const rnd = Math.round(Math.random() * 10);

    // Retorna uma resposta para a requisição
    if (rnd > 5) return res.status(200).json({ msg: 'Hello World' });

    // Simula um  erro durante a requisição
    throw new Error('Simulação de erro');
  };

  health = (req, res) => {
    res.status(200).send('OK');
  };
}

export default new TedController();
