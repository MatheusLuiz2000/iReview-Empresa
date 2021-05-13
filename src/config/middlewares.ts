// eslint-disable-next-line no-unused-vars
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import passport from './passport';

const Middlewares = (app: express.Application) => {
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));
  app.use(express.urlencoded());
  // app.use(passport.authenticate());
  app.use(express.static(path.resolve('./apidoc')));
  app.use(express.static(path.resolve('./__tests__/coverage/lcov-report')));
};

export default Middlewares;
