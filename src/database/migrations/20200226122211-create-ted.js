module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_teds', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      operacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      valor_transferencia: {
        type: Sequelize.DECIMAL(18, 3),
        allowNull: false
      },
      identificacao: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      remessa_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      json_dados: {
        type: Sequelize.JSON,
        allowNull: true
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
    return queryInterface.dropTable('tb_teds');
  }
};
