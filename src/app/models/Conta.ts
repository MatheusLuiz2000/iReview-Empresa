import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(255),
        cargo: Sequelize.STRING(255),
        email: Sequelize.STRING(255),
        url_avatar: Sequelize.STRING(255),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'contas',
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
  }
}

export default Conta;
