// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';
import TedController from './app/controllers/TedController';
import TedValidator from './app/validators/TedValidator';

import headerGlobal from './app/helpers/headerGlobal';

const routes = new Router();

routes.use(headerGlobal);

routes.get('/health', (req, res) => {
  return res.json({ ok: true });
});

routes.get('/', TedController.docs); // Rota para a documentação
routes.get('/historico', TedController.listar); // Rota para a documentação
routes.get('/:id', TedValidator.buscaTedById, TedController.listarById); // Rota para a documentação
routes.post('/cadastrar/', TedValidator.criaTed, TedController.criarTed);
routes.post('/gerar', TedController.gerarTed);
routes.post('/retorno', TedController.leituraRetornoTed);

routes.get('/consolidada/:id', TedController.listarConsolidada);

// routes.get('/health', TedController.health); // Rota para o health check
// routes.get('/testes', TedController.testes); // Rota para o health check

export default routes;
