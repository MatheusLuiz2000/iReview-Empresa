import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class TipoPagamento extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.STRING(255),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'tipo_pagamento',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default TipoPagamento;
