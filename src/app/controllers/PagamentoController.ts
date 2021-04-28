import { Request, Response } from 'express';
import path from 'path';
import moment from 'moment';
import PagamentoService from '../services/PagamentoService';

class PagamentoController {
  docs = (req, res) => {
    res.sendFile(path.resolve('./apidoc/index.html'));
  };

  listar = async (req, res) => {
    const { status, data } = await PagamentoService.listar(req.query);

    return res.status(status).json(data);
  };

  transacao = async (req, res) => {
    const { status, data } = await PagamentoService.transacao(req.body);

    return res.status(status).json(data);
  };

  postBack = async (req, res) => {
    const { status, data } = await PagamentoService.postBack(req.body);

    return res.status(status).json(data);
  };

  parcelamentoSemLimites = async (req, res) => {
    const { status, data } = await PagamentoService.parcelamentoSemLimites(
      req.body
    );

    return res.status(status).json(data);
  };
}

export default new PagamentoController();
