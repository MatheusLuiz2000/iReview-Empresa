import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class HistoricoTransacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        transacao_id: Sequelize.INTEGER,
        json: Sequelize.JSON,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'historicos_transacoes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default HistoricoTransacoes;
