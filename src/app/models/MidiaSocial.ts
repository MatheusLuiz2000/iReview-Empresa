import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class MidiaSocial extends Model {
  static init(sequelize) {
    super.init(
      {
        url_site: Sequelize.STRING(255),
        url_linkedin: Sequelize.STRING(255),
        url_youtube: Sequelize.STRING(255),
        url_instagram: Sequelize.STRING(255),
        url_skype: Sequelize.STRING(255),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'midia_social',
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

export default MidiaSocial;
