import Log from 'log-gcb';
import header from './header';
import trailer_registro from './trailer';
import trailerArquivo from './trailerArquivo';
import salvarS3 from '../../util/Funcoes';
import Ted_model from '../../models/Ted';
import Finnet from '../../../api/Finnet';

export default async (dados, quantidade, soma, ted_confirmadas) => {
  const headerDados = await header();

  const trailer_lote_dados = await trailer_registro(quantidade, soma);

  const trailerArquivoDados = await trailerArquivo(quantidade);

  const quebra_linha = String.fromCharCode(13) + String.fromCharCode(10);

  let arquivoFinal = '';
  let espaco = '';

  // ################################################################ HEADER LINE ################################################################################################################

  let header_line =
    headerDados.HEADER.COD_BANCO +
    headerDados.HEADER.LOTE_SERVICO +
    headerDados.HEADER.TIPO_REGISTRO;

  header_line += espaco.padEnd(6);

  header_line +=
    headerDados.HEADER.LAYOUT_ARQUIVO +
    headerDados.HEADER.TIPO_INSCRICAO +
    headerDados.HEADER.INSCRICAO;

  header_line += espaco.padEnd(20);

  header_line += headerDados.HEADER.AGENCIA.padStart(5, '0');

  header_line += espaco.padEnd(1);

  header_line += headerDados.HEADER.NUMERO_CONTA.padStart(12, '0');

  header_line += espaco.padEnd(1);

  header_line +=
    headerDados.HEADER.DAC +
    headerDados.HEADER.NOME_EMPRESA.padEnd(30) +
    headerDados.HEADER.NOME_BANCO.padEnd(30);

  header_line += espaco.padEnd(10);

  header_line +=
    headerDados.HEADER.ARQUIVO_CODIGO +
    headerDados.HEADER.DATA_GERACAO +
    headerDados.HEADER.HORA_GERACAO;

  header_line += espaco.padEnd(9, '0');

  header_line += headerDados.HEADER.UNIDADE_DENSIDADE;

  header_line += espaco.padEnd(69);

  arquivoFinal += header_line + quebra_linha;

  // ################################################################ HEADER LOTE ################################################################################################################

  let header_lote =
    headerDados.HEADER_LOTE.COD_BANCO +
    headerDados.HEADER_LOTE.CODIGO_LOTE +
    headerDados.HEADER_LOTE.TIPO_REGISTRO +
    headerDados.HEADER_LOTE.TIPO_OPERACAO +
    headerDados.HEADER_LOTE.TIPO_PAGAMENTO +
    headerDados.HEADER_LOTE.FORMA_PAGAMENTO +
    headerDados.HEADER_LOTE.LAYOUT_LOTE;

  header_lote += espaco.padEnd(1);

  header_lote +=
    headerDados.HEADER_LOTE.EMPRESA_INSCRICAO +
    headerDados.HEADER_LOTE.INSCRICAO_NUMERO;

  header_lote += espaco.padEnd(4);

  header_lote += espaco.padEnd(16);

  header_lote += headerDados.HEADER_LOTE.AGENCIA.padStart(5, '0');

  header_lote += espaco.padEnd(1);

  header_lote += headerDados.HEADER_LOTE.NUMERO_CONTA.padStart(12, '0');

  header_lote += espaco.padEnd(1);

  header_lote += headerDados.HEADER_LOTE.DAC;

  header_lote += headerDados.HEADER_LOTE.NOME_EMPRESA.padEnd(30);

  header_lote += espaco.padEnd(30);

  header_lote += espaco.padEnd(10);

  header_lote += headerDados.HEADER_LOTE.ENDERECO.padEnd(30);

  header_lote += headerDados.HEADER_LOTE.NUMERO_LOCAL.padStart(5, '0');

  header_lote += headerDados.HEADER_LOTE.COMPLEMENTO.padEnd(15);

  header_lote += headerDados.HEADER_LOTE.NOME_CIDADE.padEnd(20);

  header_lote += headerDados.HEADER_LOTE.CEP.padStart(8, '0');

  header_lote += headerDados.HEADER_LOTE.ESTADO;

  header_lote += espaco.padEnd(18);

  arquivoFinal += header_lote + quebra_linha;

  // ################################################################ SEGMENTOS A E B ############################################################################################################

  dados.forEach(element => {
    arquivoFinal += element;
  });

  // ################################################################ TRAILER LOTE ################################################################################################################

  let trailer_lote =
    trailer_lote_dados.TRAILER.CODIGO_BANCO +
    trailer_lote_dados.TRAILER.CODIGO_LOTE +
    trailer_lote_dados.TRAILER.TIPO_REGISTRO;

  trailer_lote += espaco.padEnd(9);

  trailer_lote += trailer_lote_dados.TRAILER.QUANTIDADE_REGISTRO.padStart(
    6,
    '0'
  );
  trailer_lote += trailer_lote_dados.TRAILER.SOMA_PAGAMENTOS.padStart(18, '0');
  trailer_lote += espaco.padStart(18, '0');
  trailer_lote += espaco.padEnd(171);
  trailer_lote += espaco.padEnd(10);

  arquivoFinal += trailer_lote + quebra_linha;

  // ################################################################ TRAILER ARQUIVO ULTIMO ################################################################################################################

  let trailer_arquivo_ultimo =
    trailerArquivoDados.TRAILER_ARQUIVO.CODIGO_BANCO +
    trailerArquivoDados.TRAILER_ARQUIVO.CODIGO_LOTE +
    trailerArquivoDados.TRAILER_ARQUIVO.TIPO_REGISTRO;

  trailer_arquivo_ultimo += espaco.padEnd(9);

  trailer_arquivo_ultimo += trailerArquivoDados.TRAILER_ARQUIVO.QUANTIDADE_LOTES.padStart(
    6,
    '0'
  );
  trailer_arquivo_ultimo += trailerArquivoDados.TRAILER_ARQUIVO.QUANTIDADE_REGISTROS.padStart(
    6,
    '0'
  );

  trailer_arquivo_ultimo += espaco.padEnd(211);

  arquivoFinal += trailer_arquivo_ultimo;

  arquivoFinal += quebra_linha;

  const salvaS3 = await salvarS3.salvarS3(arquivoFinal, 'aa');

  if (salvaS3.error) {
    Log.enviar({
      nivel: `error`,
      mensagem: `Erro ao salvar o s3`,
      detalhes: `${salvaS3.error}`
    });

    return {
      status: 400
    };
  }

  const criarRemessaFinnet = await Finnet.criarRegistroRemessa(
    salvaS3.url,
    'deposito'
  );

  if (criarRemessaFinnet.status !== 200) {
    Log.enviar({
      nivel: `error`,
      mensagem: `Não foi possivel criar a remessa na API da finnet`,
      detalhes: `${salvaS3.error}`
    });

    return {
      status: 400
    };
  }

  for (let element of ted_confirmadas) {
    await Ted_model.update(
      {
        remessa_id: criarRemessaFinnet.resposta.data.remessa_id
      },
      {
        where: {
          id: element
        }
      }
    );
  }
};
