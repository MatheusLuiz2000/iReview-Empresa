import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Log extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING(200),
        json: Sequelize.JSON,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'logs',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default Log;
