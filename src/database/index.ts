import SQLConfig from '../config/database';
import Ted from '../app/models/Ted';
import Retorno_ted from '../app/models/Retorno_ted';
import Codigo_retorno_banco from '../app/models/Codigo_retorno_banco';
import Pendencia_ted from '../app/models/Pendencia_ted';

// import mongoose from 'mongoose';

const Sequelize = require('sequelize');

const models = [
  Ted,
  Codigo_retorno_banco,
  Retorno_ted,
  Pendencia_ted
];

class Database {
  connection; 

  NOSQLConnection;

  constructor() {
    this.SQL();
    // this.NOSQL();
  }

  SQL() {
    this.connection = new Sequelize(SQLConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  // NOSQL() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //     useUnifiedTopology: true
  //   });
  // }
}

export default new Database();
