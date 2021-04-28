import Sequelize from 'sequelize';

const { Model } = require('sequelize');

class CartoesClientes extends Model {
  static init(sequelize) {
    super.init(
      {
        cliente_id: Sequelize.INTEGER,
        card_id: Sequelize.INTEGER,
        desativado_em: Sequelize.DATE
      },
      {
        sequelize,
        tableName: 'cartoes_clientes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
      }
    );

    return this;
  }
}

export default CartoesClientes;
