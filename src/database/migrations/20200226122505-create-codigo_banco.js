'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_codigos_retorno_banco', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      codigo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mensagem: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ocorrencia_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ocorrencia_responsabilidade_adiante: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tb_codigos_retorno_banco');
  }
};
