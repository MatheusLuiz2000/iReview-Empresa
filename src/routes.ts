// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';


const routes = new Router();

routes.get('/health', (req, res) => {
  return res.json({ ok: 'teste12' });
});

export default routes;
