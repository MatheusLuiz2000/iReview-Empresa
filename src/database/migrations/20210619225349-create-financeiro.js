module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('financeiro', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'empresa'
          },
          key: 'id'
        }
      },
      tipo_plano_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'plano'
          },
          key: 'id'
        }
      },
      tipo_pagamento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_pagamento'
          },
          key: 'id'
        }
      },
      data_cobranca: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      criado_em: {
        type: Sequelize.DATE,
        allowNull: false
      },
      atualizado_em: {
        type: Sequelize.DATE,
        allowNull: false
      },
      desativado_em: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('financeiro');
  }
};
