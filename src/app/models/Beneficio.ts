import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Beneficio extends Model {
  static init(sequelize) {
    super.init(
      {
        valor: Sequelize.STRING(255),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'beneficio',
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
    // this.belongsTo(models.TipoBeneficio, {
    //   as: 'tipo_beneficio',
    //   foreignKey: 'tipo_beneficio_id'
    // });
    this.belongsTo(models.TipoPeriodicidade, {
      as: 'tipo_periodicidade',
      foreignKey: 'tipo_periodicidade_id'
    });
  }
}

export default Beneficio;
