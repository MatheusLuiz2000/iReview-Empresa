'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_retornos_teds', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ted_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tb_teds'
          },
          key: 'id'
        }
      },
      status_banco: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tb_codigos_retorno_banco'
          },
          key: 'id'
        }
      },
      json_retorno: {
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
    return queryInterface.dropTable('tb_retornos_teds');
  }
};
