module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atividade', {
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
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rotina: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('atividade');
  }
};
