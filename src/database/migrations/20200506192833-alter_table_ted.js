module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('tb_teds', 'codigo_banco', {
        type: Sequelize.STRING(10),
        allowNull: true
      }),
      queryInterface.addColumn('tb_teds', 'agencia', {
        type: Sequelize.STRING(10),
        allowNull: true
      }),
      queryInterface.addColumn('tb_teds', 'conta', {
        type: Sequelize.STRING(10),
        allowNull: true
      }),
      queryInterface.addColumn('tb_teds', 'digito', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn('tb_teds', 'tipo_conta', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  }
};
