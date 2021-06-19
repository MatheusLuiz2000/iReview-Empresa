import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Financeiro extends Model {
  static init(sequelize) {
    super.init(
      {
        data_cobranca: Sequelize.DATE,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'financeiro',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Empresa, {
      as: 'empresa',
      foreignKey: 'empresa_id'
    });
    this.belongsTo(models.Plano, {
      as: 'plano',
      foreignKey: 'plano_id'
    });
    this.belongsTo(models.TipoPagamento, {
      as: 'tipo_pagamento',
      foreignKey: 'tipo_pagamento_id'
    });
  }
}

export default Financeiro;
