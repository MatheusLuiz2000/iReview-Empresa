import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class InformacaoAberta extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.TEXT,
        valores_missao: Sequelize.TEXT,
        url_banner: Sequelize.STRING(255),
        url_foto: Sequelize.STRING(255),
        url_logo: Sequelize.STRING(255),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'informacao_aberta',
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

export default InformacaoAberta;
