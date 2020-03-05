// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';
import TedController from './app/controllers/TedController';
import TedValidator from './app/validators/TedValidator';

const routes = new Router();

routes.get('/', TedController.docs); // Rota para a documentação
routes.get('/teds', TedController.listar); // Rota para a documentação
routes.get('/teds/:id', TedValidator.buscaTedById, TedController.listarById); // Rota para a documentação
routes.post('/teds/cadastrar/', TedValidator.criaTed, TedController.criarTed);
routes.post('/teds/gerar/', TedController.gerarTed);
routes.post('/teds/ler/retorno', TedController.leituraRetornoTed);
routes.post('/teste', TedController.teste);
routes.get('/health', TedController.health); // Rota para o health check
routes.get('/testes', TedController.testes); // Rota para o health check

export default routes;
