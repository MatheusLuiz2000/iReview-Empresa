import moment from 'moment';
import funcoes from '../../util/Funcoes';

export default async (dados, contadorLinha) => {
  const nossoNumero = moment().format();

  return {
    SEGMENTO_B: {
      CODIGO_BANCO: '341',
      CODIGO_LOTE: '0001',
      TIPO_REGISTRO: '3',
      NUMERO_REGISTRO: contadorLinha.toString(),
      SEGMENTO: 'B',
      TIPO_INSCRICAO: '2',
      CNPJ_FAVORECIDO: dados.Cliente.documento,
      ENDERECO: dados.Endereco.Cep.logradouro_sem_acento,
      NUMERO: dados.Endereco.numero,
      COMPLEMENTO: dados.Endereco.complemento,
      BAIRRO: dados.Endereco.Cep.Bairro.bairro_sem_acento,
      CIDADE: dados.Endereco.Cep.Cidade.cidade_sem_acento,
      CEP: dados.Endereco.Cep.cep,
      ESTADO: dados.Endereco.Cep.Cidade.estado
    }
  };
};
