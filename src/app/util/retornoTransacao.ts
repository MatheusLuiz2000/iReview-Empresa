export default function retornoTransacao(tipo_pagamento, transacao) {
  if (tipo_pagamento === 'credit_card') {
    return {
      pago: transacao.status === 'paid'
    };
  }
  return {
    transacao_id: transacao.id,
    qr_code: transacao.pix_qr_code
  };
}
