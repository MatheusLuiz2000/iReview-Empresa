module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('midia_social', {
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
      url_site: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      url_linkedin: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      url_youtube: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      url_instagram: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      url_skype: {
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
    return queryInterface.dropTable('midia_social');
  }
};
