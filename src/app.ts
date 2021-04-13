import './bootstrap';
import cors from 'cors';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import routes from './routes';
import middlewares from './config/middlewares';

import './database';

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.cors();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    middlewares(this.server);
  }

  routes() {
    this.server.use(routes);
  }

  cors() {
    this.server.use(cors());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      return res
        .status(500)
        .json({ error: 'Erro interno do servidor', errors });
    });
  }
}

export default new App().server;
