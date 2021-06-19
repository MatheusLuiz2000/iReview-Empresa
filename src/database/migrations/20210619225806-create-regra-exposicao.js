module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('regra_exposicao', {
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
      processo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      salario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      localizacao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      apenas_link: {
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
    return queryInterface.dropTable('regra_exposicao');
  }
};
