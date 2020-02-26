// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import defaultController from './app/controllers/TedController';

const routes = new Router();

routes.get('/', defaultController.docs); // Rota para a documentação
routes.get('/health', defaultController.health); // Rota para o health check
routes.get('/testes', defaultController.testes); // Rota para o health check

export default routes;
