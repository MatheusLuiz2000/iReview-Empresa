// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import PagamentoController from './app/controllers/PagamentoController';
import PagamentoValidator from './app/validators/PagamentoValidator';

const routes = new Router();

routes.get('/health', (req, res) => {
  return res.json({ ok: true });
});

routes.get('/listar', PagamentoController.listar);
routes.post(
  '/transacao',
  PagamentoValidator.transacao,
  PagamentoController.transacao
);
routes.post('/postBack', PagamentoController.postBack);
routes.post(
  '/parcelamentoSemLimites',
  PagamentoController.parcelamentoSemLimites
);

export default routes;
