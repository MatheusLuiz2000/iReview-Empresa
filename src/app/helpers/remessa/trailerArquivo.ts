import moment from 'moment';

export default async registros => {
  const quantidade_registros_soma = (parseInt(registros) - 1) * 2 + 4;

  return {
    TRAILER_ARQUIVO: {
      CODIGO_BANCO: '341',
      CODIGO_LOTE: '9999',
      TIPO_REGISTRO: '9',
      QUANTIDADE_LOTES: '1',
      QUANTIDADE_REGISTROS: quantidade_registros_soma.toString()
    }
  };
};
