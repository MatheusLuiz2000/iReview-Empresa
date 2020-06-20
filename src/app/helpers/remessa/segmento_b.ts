import moment from 'moment';
import funcoes from '../../util/Funcoes';

export default async (dados, contadorLinha) => {
  const nossoNumero = moment().format();

  dados.endereco = dados.enderecos[0];

  return {
    SEGMENTO_B: {
      CODIGO_BANCO: '341',
      CODIGO_LOTE: '0001',
      TIPO_REGISTRO: '3',
      NUMERO_REGISTRO: contadorLinha.toString(),
      SEGMENTO: 'B',
      TIPO_INSCRICAO: '2',
      CNPJ_FAVORECIDO: dados.documento,
      ENDERECO: dados.endereco.logradouro,
      NUMERO: dados.endereco.numero,
      COMPLEMENTO: dados.endereco.complemento,
      BAIRRO: dados.endereco.bairro,
      CIDADE: dados.endereco.cep.cidade.cidade_sem_acento,
      CEP: dados.endereco.cep.cep,
      ESTADO: dados.endereco.cep.estado.sigla
    }
  };
};
