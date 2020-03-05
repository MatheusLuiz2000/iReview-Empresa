'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_pendencias_ted', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ted_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'tb_teds'
          },
          key: 'id'
        }
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pendencias: {
        type: Sequelize.JSON,
        allowNull: false
      },
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
    return queryInterface.dropTable('tb_pendencias_ted');
  }
};
