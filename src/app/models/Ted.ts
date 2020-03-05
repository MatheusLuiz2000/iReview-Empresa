import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Ted extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: Sequelize.INTEGER,
        operacao_id: Sequelize.INTEGER,
        identificacao: Sequelize.STRING(20),
        remessa_id: Sequelize.INTEGER,
        json_dados: Sequelize.JSON
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
