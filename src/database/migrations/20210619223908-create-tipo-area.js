module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tipo_area', {
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
    return queryInterface.dropTable('tipo_area');
  }
};
