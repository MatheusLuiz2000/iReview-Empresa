import CartoesClientes from '../models/CartoesClientes';
import logError from '../util/logError';

export default async function(client, dados) {
  const { numero_cartao, nome_impresso_cartao, expiracao_cartao, cvv } = dados;

  try {
    const clientCard = await client.data.cards.create({
      card_number: numero_cartao,
      card_holder_name: nome_impresso_cartao,
      card_expiration_date: expiracao_cartao,
      card_cvv: cvv
    });

    const criarCartaoCliente = await CartoesClientes.create({
      cliente_id: dados.cliente_id,
      card_id: clientCard.id
    });

    clientCard.cartao_id = criarCartaoCliente.id;

    return clientCard;
  } catch (error) {
    console.log(error);
    logError('Erro ao criar o cartão', error);

    return false;
  }
}
