import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class TiposPagamento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(200),
        descricao: Sequelize.STRING(200),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'tipos_pagamentos',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default TiposPagamento;
