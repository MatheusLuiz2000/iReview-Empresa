// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';
import TedController from './app/controllers/TedController';
import TedValidator from './app/validators/TedValidator';

import headerGlobal from './app/helpers/headerGlobal';
import seed from './app/helpers/seed';

const routes = new Router();

routes.use(headerGlobal);

routes.get('/health', (req, res) => {
  return res.json({ ok: true });
});
routes.get('/bd/seed', (req, res) => {
  seed();
});
routes.get('/', TedController.docs); // Rota para a documentação
routes.get('/historico', TedController.listar); // Rota para a documentação
routes.get('/:id', TedValidator.buscaTedById, TedController.listarById); // Rota para a documentação
routes.get('/listagem/ted', TedController.listarTeds);
routes.post('/cadastrar/', TedValidator.criaTed, TedController.criarTed);
routes.get('/gerar', TedController.gerarTed);
routes.get('/retorno', TedController.leituraRetornoTed);

routes.patch('/cancelar/:operacao_id', TedController.cancelaTed);

routes.get('/consolidada/:id', TedController.listarConsolidada);
routes.get('/dados/bancarios/:id', TedController.listarDadosBancarios);

// routes.get('/health', TedController.health); // Rota para o health check
// routes.get('/testes', TedController.testes); // Rota para o health check

export default routes;
