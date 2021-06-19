module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('conta', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      url_avatar: {
        type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('conta');
  }
};
