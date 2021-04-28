import SQLConfig from '../config/database';

import Plataformas from '../app/models/Plataformas';
import Status from '../app/models/Status';
import TiposPagamento from '../app/models/TiposPagamento';
import Transacoes from '../app/models/Transacoes';
import Logs from '../app/models/Log';
import HistoricoTransacoes from '../app/models/HistoricoTransacoes';
import CartoesClientes from '../app/models/CartoesClientes';

// import mongoose from 'mongoose';

const Sequelize = require('sequelize');

const models = [
  Plataformas,
  Status,
  TiposPagamento,
  CartoesClientes,
  Transacoes,
  Logs,
  HistoricoTransacoes
];

class Database {
  connection;

  NOSQLConnection;

  constructor() {
    this.SQL();
  }

  SQL() {
    this.connection = new Sequelize(SQLConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
