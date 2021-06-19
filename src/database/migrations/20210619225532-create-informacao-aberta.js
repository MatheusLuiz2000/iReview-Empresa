module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('informacao_aberta', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'empresa'
          },
          key: 'id'
        }
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      valores_missao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      url_banner: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      url_foto: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      url_logo: {
        type: Sequelize.STRING(255),
        allowNull: true
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
    return queryInterface.dropTable('informacao_aberta');
  }
};
