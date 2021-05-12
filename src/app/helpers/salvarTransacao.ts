import Transacoes from '../models/Transacoes';
import Status from '../models/Status';
import TiposPagamento from '../models/TiposPagamento';
import HistoricoTransacoes from '../models/HistoricoTransacoes';

export default async function(dados, transacao) {
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

  return true;
}
