import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Status extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(200),
        descricao: Sequelize.STRING(200),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'status_transacao',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default Status;
