import './bootstrap';

import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import Log from 'log-gcb';
import Sqs from 'sqs-gcb';
import cors from 'cors';
import logConfig from './config/logConfig';
import sqsConfig from './config/sqsConfig';

import sqsListener from './api/sqsListener';

import routes from './routes';
import middlewares from './config/middlewares';

import './database';

class App {
  server: express.Application;

  constructor() {
    this.server = express();
    this.SqsListener();
    this.sqs();
    this.logs();
    this.cors();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  logs() {
    Log.setConfig(logConfig);
  }

  sqs() {
    Sqs.setConfig(sqsConfig);
  }

  SqsListener() {
    sqsListener.Start();
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
      if (process.env.NODE_ENV === 'develop') {
        Log.erro(req, 'ErrBack: Erro da Api', {
          detalhes: errors
        });
        return res.status(500).json(err.stack);
      }

      Log.erro(req, 'ErrBack: Erro da Api', {
        detalhes: errors
      });

      return res
        .status(500)
        .json({ error: 'Erro interno do servidor', errors });
    });
  }
}

export default new App().server;
