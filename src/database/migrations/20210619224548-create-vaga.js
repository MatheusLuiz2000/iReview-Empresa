module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vaga', {
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
          model: 'empresa',
          key: 'id'
        }
      },
      tipo_contrato_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_contrato'
          },
          key: 'id'
        }
      },
      tipo_area_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_area'
          },
          key: 'id'
        }
      },
      tipo_periodo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_periodo'
          },
          key: 'id'
        }
      },
      tipo_periodicidade_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipo_periodicidade'
          },
          key: 'id'
        }
      },
      titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      pcd: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numero_vagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data_finalizacao: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      salario_inicial: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: true
      },
      salario_FINAL: {
        type: Sequelize.DECIMAL(18, 2),
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
    return queryInterface.dropTable('vaga');
  }
};
