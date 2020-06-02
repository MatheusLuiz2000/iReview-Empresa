import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Retorno_ted extends Model {
  static init(sequelize) {
    super.init(
      {
        ted_id: Sequelize.INTEGER,
        status_banco: Sequelize.INTEGER,
        json_retorno: {
          type: Sequelize.TEXT,
          get() {
            return JSON.parse(this.getDataValue('json_retorno'));
          },
          set(value) {
            this.setDataValue('json_retorno', JSON.stringify(value));
          }
        }
      },
      {
        sequelize,
        tableName: 'tb_retornos_teds',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Ted, {
      as: 'ted',
      foreignKey: 'ted_id'
    });

    this.belongsTo(models.Codigo_retorno_banco, {
      as: 'codigo_retorno_banco',
      foreignKey: 'status_banco'
    });
  }
}

export default Retorno_ted;
