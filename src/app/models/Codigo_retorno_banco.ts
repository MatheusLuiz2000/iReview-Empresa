import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Codigo_retorno_banco extends Model {
  static init(sequelize) {
    super.init(
      {
        mensagem: Sequelize.STRING(255),
      },
      {
        sequelize,
        tableName: 'tb_codigos_retorno_banco',
      }
    );

    return this;
  }
}

export default Codigo_retorno_banco;
