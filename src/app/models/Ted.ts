import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Ted extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: Sequelize.INTEGER,
        operacao_id: Sequelize.INTEGER,
        codigo_banco: Sequelize.STRING(10),
        agencia: Sequelize.STRING(10),
        conta: Sequelize.STRING(10),
        digito: Sequelize.STRING(10),
        tipo_conta: Sequelize.INTEGER,
        valor_transferencia: Sequelize.DECIMAL(18, 3),
        identificacao: Sequelize.STRING(20),
        remessa_id: Sequelize.INTEGER,
        desativado_em: Sequelize.DATE,
        json_dados: {
          type: Sequelize.TEXT,
          get() {
            return JSON.parse(this.getDataValue('json_dados'));
          },
          set(value) {
            this.setDataValue('json_dados', JSON.stringify(value));
          }
        }
      },
      {
        sequelize,
        tableName: 'tb_teds',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Retorno_ted, {
      as: 'retorno_ted',
      foreignKey: 'ted_id'
    });
  }
}

export default Ted;
