import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(255),
        cnpj: Sequelize.STRING(255),
        email: Sequelize.STRING(255),
        senha: Sequelize.STRING(255),
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'empresas',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default Empresa;
