module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transacoes', {
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
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      transacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cartao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'cartoes_clientes'
          },
          key: 'id'
        }
      },
      total_operacao: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false
      },
      valor_parcelas: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false
      },
      numero_parcelas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pagamento_facilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      metodo_pagamento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'tipos_pagamentos'
          },
          key: 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'status_transacao'
          },
          key: 'id'
        }
      },
      plataforma_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'plataformas'
          },
          key: 'id'
        }
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
    return queryInterface.dropTable('tb_clientes');
  }
};
