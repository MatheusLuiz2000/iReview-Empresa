import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class RegraExposicao extends Model {
  static init(sequelize) {
    super.init(
      {
        processo: Sequelize.INTEGER,
        salario: Sequelize.INTEGER,
        localizacao: Sequelize.INTEGER,
        apenas_link: Sequelize.INTEGER,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'regra_exposicao',
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

export default RegraExposicao;
