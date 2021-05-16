import { Request, Response } from 'express';
import path from 'path';

class PagamentoController {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };
}

export default new PagamentoController();
