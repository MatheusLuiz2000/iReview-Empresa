import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Transacoes extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: Sequelize.INTEGER,
        produto_id: Sequelize.INTEGER,
        tipo_curso: Sequelize.INTEGER,
        transacao_id: Sequelize.INTEGER,
        cartao_id: Sequelize.INTEGER,
        total_operacao: Sequelize.DECIMAL(18, 2),
        valor_parcelas: Sequelize.DECIMAL(18, 2),
        numero_parcelas: Sequelize.INTEGER,
        pagamento_facilitado: Sequelize.BOOLEAN,
        metodo_pagamento_id: Sequelize.INTEGER,
        status_id: Sequelize.INTEGER,
        plataforma_id: Sequelize.INTEGER,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'transacoes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CartoesClientes, {
      as: 'cartoes',
      foreignKey: 'cartao_id'
    });
  }
}

export default Transacoes;
