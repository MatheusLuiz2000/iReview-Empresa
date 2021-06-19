import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Vaga extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING(255),
        cargo: Sequelize.STRING(255),
        pcd: Sequelize.INTEGER,
        numero_vagas: Sequelize.INTEGER,
        data_finalizacao: Sequelize.DATE,
        salario_inicial: Sequelize.DECIMAL(18, 2),
        salario_final: Sequelize.DECIMAL(18, 2),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'vagas',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Empresa, {
      as: 'empresa',
      foreignKey: 'empresa_id'
    });
    this.belongsTo(models.TipoContrato, {
      as: 'tipo_contrato',
      foreignKey: 'tipo_contrato_id'
    });
    this.belongsTo(models.TipoArea, {
      as: 'tipo_area',
      foreignKey: 'tipo_area_id'
    });
    this.belongsTo(models.TipoPeriodo, {
      as: 'tipo_periodo',
      foreignKey: 'tipo_periodo_id'
    });
  }
}

export default Vaga;
