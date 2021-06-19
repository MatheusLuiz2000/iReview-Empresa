import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Atividade extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.TEXT,
        rotina: Sequelize.TEXT,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'atividades',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Vaga, {
      as: 'vaga',
      foreignKey: 'vaga_id'
    });
  }
}

export default Atividade;
