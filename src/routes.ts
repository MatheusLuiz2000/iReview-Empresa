// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import PagamentoController from './app/controllers/PagamentoController';
import PagamentoValidator from './app/validators/PagamentoValidator';

const routes = new Router();

routes.get('/health', (req, res) => {
  return res.json({ ok: 'teste2' });
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
routes.post('/envioEmail', PagamentoController.envioEmail);

export default routes;
