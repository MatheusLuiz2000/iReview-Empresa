export default function(dados) {
  return {
    payment_method: dados.tipo_pagamento,
    amount: dados.total_operacao,
    postback_url: process.env.URL_POST_BACK,
    async: false,
    pix_expiration_date: '2021-05-14',
    pix_additional_fields: [
      {
        name: 'Quantidade',
        value: '1'
      }
    ],
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
      phone_numbers: [dados.customer.telefone_contato]
    }
  };
}
