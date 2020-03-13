module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'tb_codigos_retorno_banco',
      [
        {
          id: 1,
          codigo: '00',
          mensagem: 'PAGAMENTO EFETUADO',
          ocorrencia_status: true
        },
        {
          id: 2,
          codigo: 'AE',
          mensagem: 'DATA DE PAGAMENTO ALTERADA'
        },
        {
          id: 3,
          codigo: 'AG',
          mensagem: 'NÚMERO DO LOTE INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 4,
          codigo: 'AH',
          mensagem: 'NÚMERO SEQUENCIAL DO REGISTRO NO LOTE INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 5,
          codigo: 'AI',
          mensagem: 'PRODUTO DEMONSTRATIVO DE PAGAMENTO NÃO CONTRATADO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 6,
          codigo: 'AJ',
          mensagem: 'TIPO DE MOVIMENTO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 7,
          codigo: 'AL',
          mensagem: 'CÓDIGO DO BANCO FAVORECIDO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 8,
          codigo: 'AM',
          mensagem: 'AGÊNCIA DO FAVORECIDO INVÁLIDA'
        },
        {
          id: 9,
          codigo: 'AN',
          mensagem:
            'CONTA CORRENTE DO FAVORECIDO INVÁLIDA / CONTA INVESTIMENTO EXTINTA'
        },
        {
          id: 10,
          codigo: 'AO',
          mensagem: 'NOME DO FAVORECIDO INVÁLIDO'
        },
        {
          id: 11,
          codigo: 'AP',
          mensagem:
            'DATA DE PAGAMENTO / DATA DE VALIDADE / HORA DE LANÇAMENTO / ARRECADAÇÃO / APURAÇÃO INVÁLIDA'
        },
        {
          id: 12,
          codigo: 'AQ',
          mensagem: 'QUANTIDADE DE REGISTROS MAIOR QUE 999999',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 13,
          codigo: 'AR',
          mensagem: 'VALOR ARRECADADO / LANÇAMENTO INVÁLIDO'
        },
        {
          id: 14,
          codigo: 'BC',
          mensagem: 'NOSSO NÚMERO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 15,
          codigo: 'BD',
          mensagem: 'PAGAMENTO AGENDADO',
          ocorrencia_status: true
        },
        {
          id: 16,
          codigo: 'BE',
          mensagem: 'PAGAMENTO AGENDADO COM FORMA ALTEARADA PARA OP',
          ocorrencia_status: true
        },
        {
          id: 17,
          codigo: 'BI',
          mensagem:
            'CNPJ/CPF DO BENEFICIÁRIO INVÁLIDO NO SEGMENTO J-52 ou B INVÁLIDO'
        },
        {
          id: 18,
          codigo: 'BL',
          mensagem: 'VALOR DA PARCELA INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 19,
          codigo: 'CD',
          mensagem: 'CNPJ / CPF INFORMADO DIVERGENTE DO CADASTRADO'
        },
        {
          id: 20,
          codigo: 'CE',
          mensagem: 'PAGAMENTO CANCELADO'
        },
        {
          id: 21,
          codigo: 'CF',
          mensagem: 'VALOR DO DOCUMENTO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 22,
          codigo: 'CG',
          mensagem: 'VALOR DO ABATIMENTO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 23,
          codigo: 'CH',
          mensagem: 'VALOR DO DESCONTO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 24,
          codigo: 'CI',
          mensagem:
            'CNPJ / CPF / IDENTIFICADOR / INSCRIÇÃO ESTADUAL / INSCRIÇÃO NO CAD / ICMS INVÁLIDO'
        },
        {
          id: 25,
          codigo: 'CJ',
          mensagem: 'VALOR DA MULTA INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 26,
          codigo: 'CK',
          mensagem: 'TIPO DE INSCRIÇÃO INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 27,
          codigo: 'CL',
          mensagem: 'VALOR DO INSS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 28,
          codigo: 'CM',
          mensagem: 'VALOR DO COFINS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 29,
          codigo: 'CN',
          mensagem: 'CONTA NÃO CADASTRADA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 30,
          codigo: 'CO',
          mensagem: 'VALOR DE OUTRAS ENTIDADES INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 31,
          codigo: 'CP',
          mensagem: 'CONFIRMAÇÃO DE OP CUMPRIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 32,
          codigo: 'CQ',
          mensagem: 'SOMA DAS FATURAS DIFERE DO PAGAMENTO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 33,
          codigo: 'CR',
          mensagem: 'VALOR DO CSLL INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 34,
          codigo: 'CS',
          mensagem: 'DATA DE VENCIMENTO DA FATURA INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 35,
          codigo: 'DA',
          mensagem: 'NÚMERO DE DEPEND. SALÁRIO FAMILIA INVALIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 36,
          codigo: 'DB',
          mensagem: 'NÚMERO DE HORAS SEMANAIS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 37,
          codigo: 'DC',
          mensagem: 'SALÁRIO DE CONTRIBUIÇÃO INSS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 38,
          codigo: 'DD',
          mensagem: 'SALÁRIO DE CONTRIBUIÇÃO FGTS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 39,
          codigo: 'DE',
          mensagem: 'VALOR TOTAL DOS PROVENTOS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 40,
          codigo: 'DF',
          mensagem: 'VALOR TOTAL DOS DESCONTOS INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 41,
          codigo: 'DG',
          mensagem: 'VALOR LÍQUIDO NÃO NUMÉRICO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 42,
          codigo: 'DH',
          mensagem: 'VALOR LIQ. INFORMADO DIFERE DO CALCULADO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 43,
          codigo: 'DI',
          mensagem: 'VALOR DO SALÁRIO-BASE INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 44,
          codigo: 'DJ',
          mensagem: 'BASE DE CÁLCULO IRRF INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 45,
          codigo: 'DK',
          mensagem: 'BASE DE CÁLCULO FGTS INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 46,
          codigo: 'DL',
          mensagem: 'FORMA DE PAGAMENTO INCOMPATÍVEL COM HOLERITE',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 47,
          codigo: 'DM',
          mensagem: 'E-MAIL DO FAVORECIDO INVÁLIDO'
        },
        {
          id: 48,
          codigo: 'DV',
          mensagem: 'DOC / TED DEVOLVIDO PELO BANCO FAVORECIDO'
        },
        {
          id: 49,
          codigo: 'D0',
          mensagem: 'FINALIDADE DO HOLERITE INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 50,
          codigo: 'D1',
          mensagem: 'MÊS DE COMPETENCIA DO HOLERITE INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 51,
          codigo: 'D2',
          mensagem: 'DIA DA COMPETENCIA DO HOLETITE INVÁLIDA',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 52,
          codigo: 'D3',
          mensagem: 'CENTRO DE CUSTO INVÁLIDO',
          ocorrencia_responsabilidade_adiante: true
        },
        {
          id: 53,
          codigo: 'D4',
          mensagem: 'CAMPO NUMÉRICO DA FUNCIONAL INVÁLIDO'
        },
        {
          id: 54,
          codigo: 'D5',
          mensagem: 'DATA INÍCIO DE FÉRIAS NÃO NUMÉRICA'
        },
        {
          id: 55,
          codigo: 'D6',
          mensagem: 'DATA INÍCIO DE FÉRIAS INCONSISTENTE'
        },
        {
          id: 56,
          codigo: 'D7',
          mensagem: 'DATA FIM DE FÉRIAS NÃO NUMÉRICO'
        },
        {
          id: 57,
          codigo: 'D8',
          mensagem: 'DATA FIM DE FÉRIAS INCONSISTENTE'
        },
        {
          id: 58,
          codigo: 'D9',
          mensagem: 'NÚMERO DE DEPENDENTES IR INVÁLIDO'
        },
        {
          id: 59,
          codigo: 'EM',
          mensagem: 'CONFIRMAÇÃO DE OP EMITIDA'
        },
        {
          id: 60,
          codigo: 'EX',
          mensagem: 'DEVOLUÇÃO DE OP NÃO SACADA PELO FAVORECIDO'
        },
        {
          id: 61,
          codigo: 'E0',
          mensagem: 'TIPO DE MOVIMENTO HOLERITE INVÁLIDO'
        },
        {
          id: 62,
          codigo: 'E1',
          mensagem: 'VALOR 01 DO HOLERITE / INFORME INVÁLIDO'
        },
        {
          id: 63,
          codigo: 'E2',
          mensagem: 'VALOR 02 DO HOLERITE / INFORME INVÁLIDO'
        },
        {
          id: 64,
          codigo: 'E3',
          mensagem: 'VALOR 03 DO HOLERITE / INFORME INVÁLIDO'
        },
        {
          id: 65,
          codigo: 'E4',
          mensagem: 'VALOR 04 DO HOLERITE / INFORME INVÁLIDO'
        },
        {
          id: 66,
          codigo: 'FC',
          mensagem: 'PAGAMENTO EFETUADO ATRAVÉS DE FINANCIAMENTO COMPROR',
          ocorrencia_status: true
        },
        {
          id: 67,
          codigo: 'FD',
          mensagem: 'PAGAMENTO EFETUADO ATRAVÉS DE FINANCIAMENTO DESCOMPROR'
        },
        {
          id: 68,
          codigo: 'HA',
          mensagem: 'ERRO NO HEADER DE ARQUIVO'
        },
        {
          id: 69,
          codigo: 'HM',
          mensagem: 'ERRO NO HEADER DE LOTE'
        },
        {
          id: 70,
          codigo: 'IB',
          mensagem: 'VALOR E/OU DATA DO DOCUMENTO INVÁLIDO'
        },
        {
          id: 71,
          codigo: 'IC',
          mensagem: 'VALOR DO ABATIMENTO INVÁLIDO'
        },
        {
          id: 72,
          codigo: 'ID',
          mensagem: 'VALOR DO DESCONTO INVÁLIDO'
        },
        {
          id: 73,
          codigo: 'IE',
          mensagem: 'VALOR DA MORA INVÁLIDO'
        },
        {
          id: 74,
          codigo: 'IF',
          mensagem: 'VALOR DA MULTA INVÁLIDO'
        },
        {
          id: 75,
          codigo: 'IG',
          mensagem: 'VALOR DA DEDUÇÃO INVÁLIDO'
        },
        {
          id: 76,
          codigo: 'IH',
          mensagem: 'VALOR DO ACRÉSCIMO INVÁLIDO'
        },
        {
          id: 77,
          codigo: 'II',
          mensagem: 'DATA DE VENCIMENTO INVÁLIDA'
        },
        {
          id: 78,
          codigo: 'IJ',
          mensagem: 'COMPETÊNCIA / PERÍODO REFERÊNCIA / PARCELA INVÁLIDA'
        },
        {
          id: 79,
          codigo: 'IK',
          mensagem:
            'TRIBUTO NÃO LIQUIDÁVEL VIA SISPAG OU NÃO CONVENIADO COM ITAÚ'
        },
        {
          id: 80,
          codigo: 'IL',
          mensagem: 'CÓDIGO DE PAGAMENTO / EMPRESA /RECEITA INVÁLIDO'
        },
        {
          id: 81,
          codigo: 'IM',
          mensagem: 'TIPO X FORMA NÃO COMPATÍVEL'
        },
        {
          id: 82,
          codigo: 'IN',
          mensagem: 'BANCO/AGENCIA NÃO CADASTRADOS'
        },
        {
          id: 83,
          codigo: 'IO',
          mensagem:
            'DAC / VALOR / COMPETÊNCIA / IDENTIFICADOR DO LACRE INVÁLIDO'
        },
        {
          id: 84,
          codigo: 'IP',
          mensagem: 'DAC DO CÓDIGO DE BARRAS INVÁLIDO'
        },
        {
          id: 85,
          codigo: 'IQ',
          mensagem: 'DÍVIDA ATIVA OU NÚMERO DE ETIQUETA INVÁLIDO'
        },
        {
          id: 86,
          codigo: 'IR',
          mensagem: 'PAGAMENTO ALTERADO'
        },
        {
          id: 87,
          codigo: 'IS',
          mensagem: 'CONCESSIONÁRIA NÃO CONVENIADA COM ITAÚ'
        },
        {
          id: 88,
          codigo: 'IT',
          mensagem: 'VALOR DO TRIBUTO INVÁLIDO'
        },
        {
          id: 89,
          codigo: 'IU',
          mensagem: 'VALOR DA RECEITA BRUTA ACUMULADA INVÁLIDO'
        },
        {
          id: 90,
          codigo: 'IV',
          mensagem: 'NÚMERO DO DOCUMENTO ORIGEM / REFERÊNCIA INVÁLIDO'
        },
        {
          id: 91,
          codigo: 'IX',
          mensagem: 'CÓDIGO DO PRODUTO INVÁLIDO'
        },
        {
          id: 92,
          codigo: 'LA',
          mensagem: 'DATA DE PAGAMENTO DE UM LOTE ALTERADA'
        },
        {
          id: 93,
          codigo: 'LC',
          mensagem: 'LOTE DE PAGAMENTOS CANCELADO'
        },
        {
          id: 94,
          codigo: 'NA',
          mensagem: 'PAGAMENTO CANCELADO POR FALTA DE AUTORIZAÇÃO'
        },
        {
          id: 95,
          codigo: 'NB',
          mensagem: 'IDENTIFICAÇÃO DO TRIBUTO INVÁLIDA'
        },
        {
          id: 96,
          codigo: 'NC',
          mensagem: 'EXERCÍCIO (ANO BASE) INVÁLIDO'
        },
        {
          id: 97,
          codigo: 'ND',
          mensagem: 'CÓDIGO RENAVAM NÃO ENCONTRADO/INVÁLIDO'
        },
        {
          id: 98,
          codigo: 'NE',
          mensagem: 'UF INVÁLIDA'
        },
        {
          id: 99,
          codigo: 'NF',
          mensagem: 'CÓDIGO DO MUNICÍPIO INVÁLIDO'
        },
        {
          id: 100,
          codigo: 'NG',
          mensagem: 'PLACA INVÁLIDA'
        },
        {
          id: 101,
          codigo: 'NH',
          mensagem: 'OPÇÃO/PARCELA DE PAGAMENTO INVÁLIDA'
        },
        {
          id: 102,
          codigo: 'NI',
          mensagem: 'TRIBUTO JÁ FOI PAGO OU ESTÁ VENCIDO'
        },
        {
          id: 103,
          codigo: 'NR',
          mensagem: 'OPERAÇÃO NÃO REALIZADA'
        },
        {
          id: 104,
          codigo: 'PD',
          mensagem: 'AQUISIÇÃO CONFIRMADA (EQUIVALE A OCORRÊNCIA 02 NO LAYOUT'
        },
        {
          id: 105,
          codigo: 'DE',
          mensagem: 'RISCO SACADO)'
        },
        {
          id: 106,
          codigo: 'RJ',
          mensagem: 'REGISTRO REJEITADO'
        },
        {
          id: 107,
          codigo: 'RS',
          mensagem:
            'PAGAMENTO DISPONÍVEL PARA ANTECIPAÇÃO NO RISCO SACADO – MODALIDADE RISCO SACADO PÓS AUTORIZADO'
        },
        {
          id: 108,
          codigo: 'SS',
          mensagem:
            'PAGAMENTO CANCELADO POR INSUFICIÊNCIA DE SALDO/LIMITE DIÁRIO DE PAGTO'
        },
        {
          id: 109,
          codigo: 'TA',
          mensagem: 'LOTE NÃO ACEITO - TOTAIS DO LOTE COM DIFERENÇA'
        },
        {
          id: 110,
          codigo: 'TI',
          mensagem: 'TITULARIDADE INVÁLIDA'
        },
        {
          id: 111,
          codigo: 'X1',
          mensagem: 'FORMA INCOMPATÍVEL COM LAYOUT 010'
        },
        {
          id: 112,
          codigo: 'X2',
          mensagem: 'NÚMERO DA NOTA FISCAL INVÁLIDO'
        },
        {
          id: 113,
          codigo: 'X3',
          mensagem: 'IDENTIFICADOR DE NF/CNPJ INVÁLIDO'
        },
        {
          id: 114,
          codigo: 'X4',
          mensagem: 'FORMA 32 INVÁLIDA'
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('tb_codigos_retorno_banco', null, {});
  }
};
