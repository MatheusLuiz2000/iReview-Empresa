import segmento_a from '../remessa/segmento_a';
import segmento_b from '../remessa/segmento_b';

export default async (dados,contador_linha) => {
  
  const segmentoADados = await segmento_a(dados,contador_linha);
  contador_linha++;
  const segmentoBDados = await segmento_b(dados,contador_linha);
  contador_linha++;
  const quebra_linha = String.fromCharCode(13) + String.fromCharCode(10);

  let espaco = "";
  let dadosCliente = "";

  
  //################################################################ SEGMENTO A ################################################################################################################

  let segmento_a_linha =
    segmentoADados.SEGMENTO_A.CODIGO_BANCO +
    segmentoADados.SEGMENTO_A.CODIGO_LOTE +
    segmentoADados.SEGMENTO_A.TIPO_REGISTRO +
    segmentoADados.SEGMENTO_A.NUMERO_REGISTRO.padStart(5,'0') +
    segmentoADados.SEGMENTO_A.SEGMENTO +
    segmentoADados.SEGMENTO_A.TIPO_MOVIMENTO +
    segmentoADados.SEGMENTO_A.CAMARA +
    segmentoADados.SEGMENTO_A.BANCO_FAVORECIDO +
    segmentoADados.SEGMENTO_A.AGENCIA_CONTA +
    segmentoADados.SEGMENTO_A.NOME_FAVORECIDO.substring(0,30).padEnd(30) +
    segmentoADados.SEGMENTO_A.SEU_NUMERO.padEnd(20) +
    segmentoADados.SEGMENTO_A.DATA_PAGAMENTO + 
    segmentoADados.SEGMENTO_A.TIPO_MOEDA;

  segmento_a_linha += espaco.padStart(8, '0');
  segmento_a_linha += espaco.padStart(7, '0');

  segmento_a_linha +=
    segmentoADados.SEGMENTO_A.VALOR_PAGAMENTO.replace(/\D/gm, "").padStart(15, '0') +
    segmentoADados.SEGMENTO_A.NOSSO_NUMERO.padEnd(15);

  segmento_a_linha += espaco.padEnd(5);

  segmento_a_linha +=
    segmentoADados.SEGMENTO_A.DATA_EFETIVO.padStart(8, '0') +
    segmentoADados.SEGMENTO_A.VALOR_EFETIVO.padStart(15, '0');

  segmento_a_linha += espaco.padEnd(18);

  segmento_a_linha += espaco.padEnd(2);

  segmento_a_linha += espaco.padStart(6, '0');

  segmento_a_linha += segmentoADados.SEGMENTO_A.CNPJ_FAVORECIDO;

  segmento_a_linha += espaco.padEnd(2);

  segmento_a_linha += segmentoADados.SEGMENTO_A.FINALIDADE_TED;

  segmento_a_linha += espaco.padEnd(5);

  segmento_a_linha += espaco.padEnd(1);

  segmento_a_linha += espaco.padEnd(10);

  dadosCliente += segmento_a_linha + quebra_linha;

  //################################################################ SEGMENTO B ################################################################################################################

  let segmento_b_linha =
    segmentoBDados.SEGMENTO_B.CODIGO_BANCO +
    segmentoBDados.SEGMENTO_B.CODIGO_LOTE +
    segmentoBDados.SEGMENTO_B.TIPO_REGISTRO +
    segmentoBDados.SEGMENTO_B.NUMERO_REGISTRO.padStart(5,"0") +
    segmentoBDados.SEGMENTO_B.SEGMENTO;

  segmento_b_linha += espaco.padStart(3);

  segmento_b_linha +=
    segmentoBDados.SEGMENTO_B.TIPO_INSCRICAO +
    segmentoBDados.SEGMENTO_B.CNPJ_FAVORECIDO +
    segmentoBDados.SEGMENTO_B.ENDERECO.substring(0, 30).padEnd(30) +
    segmentoBDados.SEGMENTO_B.NUMERO.substring(0, 5).padStart(5, '0') +
    segmentoBDados.SEGMENTO_B.COMPLEMENTO.substring(0, 15).padEnd(15) +
    segmentoBDados.SEGMENTO_B.BAIRRO.substring(0, 15).padEnd(15) +
    segmentoBDados.SEGMENTO_B.CIDADE.substring(0, 20).padEnd(20) +
    segmentoBDados.SEGMENTO_B.CEP.substring(0, 8).padStart(8, '0') +
    segmentoBDados.SEGMENTO_B.ESTADO;

  segmento_b_linha += espaco.padEnd(100);

  segmento_b_linha += espaco.padEnd(3);

  segmento_b_linha += espaco.padEnd(10);


  dadosCliente += segmento_b_linha + quebra_linha;

  return {
    dados: dadosCliente,
    linha: contador_linha
  };

}