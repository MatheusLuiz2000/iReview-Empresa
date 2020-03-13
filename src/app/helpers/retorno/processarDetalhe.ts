import moment from 'moment';
import util from '../../util/Funcoes';

export default async linha => {
  const agencia_conta = await util.agencia_conta(linha.substr(24, 20));
  const ocorrencia_descricao = await util.buscaDescricao(
    linha.substr(231, 10).trim()
  );
  const buscaTedId = await util.buscaTedId(linha.substr(74, 20).trim());

  const dados = {
    banco: linha.substr(1, 3),
    lote: linha.substr(4, 4),
    registro: linha.substr(8, 1),
    num_registro_lote: linha.substr(9, 5).replace(/^0+/, ''),
    segmento: linha.substr(14, 1),
    tipo_movimento: linha.substr(15, 3).replace(/^0+/, ''),
    camara: linha.substr(18, 3).replace(/^0+/, ''),
    banco_favorecido: linha.substr(21, 3),
    agencia: agencia_conta.agencia_formatado,
    conta: agencia_conta.conta_formatado,
    digito_verificador: agencia_conta.digito,
    nome_cedente: await util.formata_cedente(linha.substr(44, 30)),
    uso_empresa: linha.substr(74, 20).trim(),
    data_prevista_pagamento: moment(linha.substr(94, 8), 'DD/MM/YYYY').format(
      'DD/MM/YYYY'
    ),
    tipo_moeda: linha.substr(102, 3),
    codigo_ISPB: linha.substr(105, 112),
    valor_previsto_pagamento: (
      parseFloat(linha.substr(120, 15).replace(/^0+/, '')) * 0.01
    ).toFixed(2),
    nosso_numero: linha.substr(135, 15).trim(),
    data_efetivacao_pagamento: moment(
      linha.substr(155, 8),
      'DD/MM/YYYY'
    ).format('DD/MM/YYYY'),
    valor_efetivo_pagamento: (
      parseFloat(linha.substr(163, 15).replace(/^0+/, '')) * 0.01
    ).toFixed(2),
    numero_documento: linha.substr(198, 6),
    numero_documento_favorecido: linha.substr(204, 14),
    finalidade_doc: linha.substr(218, 2).trim(),
    finalidade_ted: linha.substr(220, 5).trim(),
    aviso_favorecido: linha.substr(230, 1).trim(),
    ocorrencia_codigo: ocorrencia_descricao ? ocorrencia_descricao.codigo : '',
    descricao_ocorrencia: ocorrencia_descricao
      ? ocorrencia_descricao.mensagem
      : '',
    id_codigo_retorno_ocorrencia: ocorrencia_descricao
      ? ocorrencia_descricao.id
      : '',
    ocorrencia_status: ocorrencia_descricao
      ? ocorrencia_descricao.ocorrencia_status
      : '',
    ocorrencia_responsabilidade_adiante: ocorrencia_descricao
      ? ocorrencia_descricao.ocorrencia_responsabilidade_adiante
      : '',
    ted_id: buscaTedId || ''
  };
  return dados;
};
