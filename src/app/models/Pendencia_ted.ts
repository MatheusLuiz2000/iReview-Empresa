import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Pendencia_ted extends Model {
  static init(sequelize) {
    super.init(
      {
        ted_id: Sequelize.INTEGER,
        cliente_id: Sequelize.INTEGER,
        pendencias: {
          type: Sequelize.TEXT,
          get() {
            return JSON.parse(this.getDataValue('pendencias'));
          },
          set(value) {
            this.setDataValue('pendencias', JSON.stringify(value));
          }
        }
      },
      {
        sequelize,
        tableName: 'tb_pendencias_ted',
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
  }
}

export default Pendencia_ted;
