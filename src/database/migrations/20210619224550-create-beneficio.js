module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('beneficio', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      valor: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      vaga_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'vaga'
          },
          key: 'id'
        }
      },
      tipo_beneficio_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_beneficio'
          },
          key: 'id'
        }
      },
      tipo_periodicidade_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_periodicidade'
          },
          key: 'id'
        }
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
    return queryInterface.dropTable('beneficio');
  }
};
