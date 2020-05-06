import moment from 'moment';
import funcoes from '../../util/Funcoes';

export default async (dados, dadosTed, contadorLinha) => {
  let espaco = '';
  let agencia_conta = '';

  dados.Banco = dados.banco[0];

  if (dados.Banco.codigo_banco === 341) {
    agencia_conta += espaco.padStart(1, '0');

    agencia_conta += dados.Banco.agencia.subString(0, 4).padStart(4, '0');

    agencia_conta += espaco.padEnd(1);

    agencia_conta += espaco.padStart(6, '0');

    agencia_conta += dados.Banco.conta.substring(0, 6).padStart(6, '0');

    agencia_conta += espaco.padEnd(1);

    agencia_conta += dados.Banco.digito.substring(0, 1);
  } else {
    agencia_conta = '';

    agencia_conta += dados.Banco.agencia.padStart(5, '0');

    agencia_conta += espaco.padEnd(1);

    agencia_conta += dados.Banco.conta.padStart(12, '0');

    agencia_conta += espaco.padEnd(1);

    agencia_conta += dados.Banco.digito;
  }

  return {
    SEGMENTO_A: {
      CODIGO_BANCO: '341',
      CODIGO_LOTE: '0001',
      TIPO_REGISTRO: '3',
      NUMERO_REGISTRO: contadorLinha.toString(),
      SEGMENTO: 'A',
      TIPO_MOVIMENTO: '002',
      CAMARA: '000',
      BANCO_FAVORECIDO: dados.Banco.codigo_banco,
      AGENCIA_CONTA: agencia_conta,
      NOME_FAVORECIDO: await funcoes.removerCaractersEspeciais(
        dados.razao_social
      ),
      SEU_NUMERO: dadosTed.identificacao,
      DATA_PAGAMENTO: moment().format('DDMMYYYY'),
      TIPO_MOEDA: '009',
      VALOR_PAGAMENTO: parseFloat(dadosTed.valor_transferencia)
        .toFixed(2)
        .replace(/\D/gm, ''),
      NOSSO_NUMERO: '',
      DATA_EFETIVO: '',
      VALOR_EFETIVO: '',
      CNPJ_FAVORECIDO: dados.documento,
      FINALIDADE_TED: '00010'
    }
  };
};
