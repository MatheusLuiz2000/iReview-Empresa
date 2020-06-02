module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tb_teds', 'confirmada', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('tb_teds', 'confirmada');
  }
};
