export default function(dados) {
  return {
    card_id: dados.clientCard,
    payment_method: dados.tipo_pagamento,
    amount: dados.total_operacao,
    installments: dados.numero_parcelas,
    postback_url: process.env.URL_POST_BACK,
    async: false,
    customer: {
      external_id: dados.customer.id_proprio,
      name: dados.customer.nome,
      type: dados.customer.tipo,
      country: dados.customer.pais,
      email: dados.customer.email,
      documents: [
        {
          type: dados.customer.tipo_documento,
          number: dados.customer.documento
        }
      ],
      phone_numbers: [dados.customer.telefone_contato],
      birthday: dados.customer.data_nascimento
    },
    items: [
      {
        tangible: dados.item.tangivel,
        quantity: dados.item.quantidade,
        unit_price: dados.item.preco_unitario,
        title: dados.item.titulo_item,
        id: dados.item.id_item.toString()
      }
    ],
    billing: {
      name: dados.billing.nome,
      address: {
        country: dados.billing.pais,
        state: dados.billing.estado,
        city: dados.billing.cidade,
        neighborhood: dados.billing.bairro,
        street: dados.billing.rua,
        street_number: dados.billing.numero_rua,
        zipcode: dados.billing.cep
      }
    }
  };
}
