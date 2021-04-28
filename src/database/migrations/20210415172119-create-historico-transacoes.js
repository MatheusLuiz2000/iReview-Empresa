module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('historicos_transacoes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      transacao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'transacoes'
          },
          key: 'id'
        }
      },
      json: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('historicos_transacoes');
  }
};
