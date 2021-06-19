// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';

import Atividade from './app/models/Atividade';

const routes = new Router();

routes.get('/health', (req, res) => {
  return res.json({ ok: 'teste12' });
});

routes.get('/docs', (req, res) => {});

export default routes;
