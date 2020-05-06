import moment from 'moment';

export default async (registros, soma) => {
  console.log(soma);
  // Soma do tipo de registro 1,3,5;
  const soma_registros = registros * 2;
  return {
    TRAILER: {
      CODIGO_BANCO: '341',
      CODIGO_LOTE: '0001',
      TIPO_REGISTRO: '5',
      QUANTIDADE_REGISTRO: soma_registros.toString(),
      SOMA_PAGAMENTOS: parseFloat(soma)
        .toFixed(2)
        .replace(/\D/gm, '')
    }
  };
};
