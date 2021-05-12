import Transacoes from '../models/Transacoes';
import Status from '../models/Status';
import TiposPagamento from '../models/TiposPagamento';
import HistoricoTransacoes from '../models/HistoricoTransacoes';
import enviarEmail from './enviarEmail';

export default async function(dados, transacao, erro = '') {
  const {
    cliente_id,
    produto_id,
    total_operacao,
    numero_parcelas,
    valor_parcelas,
    pagamento_facilitado,
    plataforma,
    tipo_pagamento,
    cartao_id
  } = dados;

  const buscaStatus = await Status.findOne({
    where: {
      nome: transacao.status
    }
  });

  const buscaTipoPagamento = await TiposPagamento.findOne({
    where: {
      nome: tipo_pagamento
    }
  });

  const transacaoID = await Transacoes.create({
    cliente_id,
    produto_id,
    transacao_id: transacao.id,
    cartao_id: cartao_id || null,
    total_operacao,
    numero_parcelas,
    valor_parcelas,
    pagamento_facilitado,
    metodo_pagamento_id: buscaTipoPagamento.id,
    status_id: buscaStatus.id,
    plataforma_id: plataforma
  });

  await HistoricoTransacoes.create({
    transacao_id: transacaoID.id,
    json: transacao
  });

  let tipoEmail = 2;

  switch (transacao.status) {
    case 'paid':
      tipoEmail = 1;
      break;
    case 'processing':
    case 'waiting_payment':
    case 'pending_refund':
    case 'analyzing':
      tipoEmail = 2;
      break;
    case 'refused':
      tipoEmail = 3;
      break;
    default:
      break;
  }

  await enviarEmail(
    tipoEmail,
    transacaoID.id,
    dados.customer.email,
    dados.item.titulo_item,
    dados.numero_parcelas,
    parseFloat(dados.valor_parcelas).toFixed(2),
    parseFloat(dados.total_operacao_currency).toFixed(2),
    dados.customer.nome,
    erro
  );

  return true;
}
