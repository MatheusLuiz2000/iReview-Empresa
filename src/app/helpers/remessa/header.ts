import moment from 'moment';

export default async banco => {
  let forma_pagamento;

  if (banco === '341') {
    forma_pagamento = '01';
  } else {
    forma_pagamento = '41';
  }
  return {
    HEADER: {
      COD_BANCO: '341',
      LOTE_SERVICO: '0000',
      TIPO_REGISTRO: '0',
      LAYOUT_ARQUIVO: '081',
      INSCRICAO: '33013052000151'.substring(0, 14),
      AGENCIA: '8719',
      NUMERO_CONTA: '16860',
      DAC: '4',
      NOME_EMPRESA: 'Adiante Recebiveis S.A'.substring(0, 30),
      NOME_BANCO: 'BANCO ITAU S.A.',
      TIPO_INSCRICAO: '2',
      ARQUIVO_CODIGO: '1',
      DATA_GERACAO: moment().format('DDMMYYYY'),
      HORA_GERACAO: moment().format('HHmmss'),
      UNIDADE_DENSIDADE: '00000'
    },
    HEADER_LOTE: {
      COD_BANCO: '341',
      CODIGO_LOTE: '0001',
      TIPO_REGISTRO: '1',
      TIPO_OPERACAO: 'C',
      TIPO_PAGAMENTO: '20',
      FORMA_PAGAMENTO: forma_pagamento,
      LAYOUT_LOTE: '040',
      EMPRESA_INSCRICAO: '2',
      INSCRICAO_NUMERO: '33013052000151',
      AGENCIA: '8719',
      NUMERO_CONTA: '16860',
      DAC: '4',
      NOME_EMPRESA: 'Adiante Recebiveis S.A',
      ENDERECO: 'Rua Conceicao Monte Alegre',
      NUMERO_LOCAL: '107',
      COMPLEMENTO: '9 Andar',
      NOME_CIDADE: 'Sao Paulo',
      CEP: '04563060',
      ESTADO: 'SP'
    }
  };
};
