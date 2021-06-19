import SQLConfig from '../config/database';

// Models
import Atividade from '../app/models/Atividade';
import Beneficio from '../app/models/Beneficio';
import Conta from '../app/models/Conta';
import Empresa from '../app/models/Empresa';
import Financeiro from '../app/models/Financeiro';
import InformacaoAberta from '../app/models/InformacaoAberta';
import MidiaSocial from '../app/models/MidiaSocial';
import RegraExposicao from '../app/models/RegraExposicao';
import TipoArea from '../app/models/TipoArea';
import TipoCargo from '../app/models/TipoCargo';
import TipoContrato from '../app/models/TipoContrato';
import TipoPagamento from '../app/models/TipoPagamento';
import TipoPeriodicidade from '../app/models/TipoPeriodicidade';
import TipoPeriodo from '../app/models/TipoPeriodo';
import Plano from '../app/models/Plano';
import Vaga from '../app/models/Vaga';

const Sequelize = require('sequelize');

const models = [
  Atividade,
  Vaga,
  Beneficio,
  Conta,
  Empresa,
  Financeiro,
  InformacaoAberta,
  MidiaSocial,
  RegraExposicao,
  TipoArea,
  TipoCargo,
  TipoContrato,
  TipoPagamento,
  TipoPeriodicidade,
  TipoPeriodo,
  Plano
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
