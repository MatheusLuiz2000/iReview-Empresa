import rp from 'request-promise';
import Sqs from 'sqs-gcb';
import Log from 'log-gcb';
import getS3File from '../../util/getS3File';
import processarHeaderArquivo from './processarHeaderArquivo';
import processarHeaderLote from './processarHeaderLote';
import processarDetalhe from './processarDetalhe';
import processarTrailerLote from './processarTrailerLote';
import processarTrailerArquivo from './processarTrailerArquivo';
import retorno_ted from '../../models/Retorno_ted';
import Ted from '../../models/Ted';

export default async link_s3 => {
  const getIdHeaderArquivo = 0;
  const getIdHeaderLote = 1;
  const getIdDetalhe = 3;
  const getIdTrailerLote = 5;
  const getIdTrailerArquivo = 9;

  const arrayHeader = new Array();
  const arrayHeaderLote = new Array();
  const arrayDetalhe = new Array();
  const arrayTrailerLote = new Array();
  const arrayTrailerArquivo = new Array();

  let contagem = 0;

  try {
    const conteudoLinhas = await getS3File(link_s3);

    if (conteudoLinhas === 'erro') {
      return 0;
    }

    const conteudoArquivo = conteudoLinhas.split('\n');

    for (let linha of conteudoArquivo) {
      linha = ` ${linha}`;
      const tipoLinha = parseInt(linha.substr(8, 1));

      switch (tipoLinha) {
        case getIdHeaderArquivo:
          arrayHeader.push(await processarHeaderArquivo(linha));
          break;
        case getIdHeaderLote:
          arrayHeaderLote.push(await processarHeaderLote(linha));
          break;
        case getIdDetalhe:
          arrayDetalhe.push(await processarDetalhe(linha));
          break;
        case getIdTrailerLote:
          arrayTrailerLote.push(await processarTrailerLote(linha));
          break;
        case getIdTrailerArquivo:
          arrayTrailerArquivo.push(await processarTrailerArquivo(linha));
          break;
        default:
          break;
      }

      if (tipoLinha === getIdDetalhe) {
        if (arrayDetalhe[contagem].id_codigo_retorno_ocorrencia === 1) {
          const ted = await Ted.findOne({
            where: { identificacao: arrayDetalhe[contagem].uso_empresa }
          });
          if (ted) {
            console.log('enviado');
            Sqs.object(
              'https://sqs.sa-east-1.amazonaws.com/544005205437/ted-solicitacao-boleto.fifo',
              {
                operacao_id: ted.operacao_id
              }
            );
          }
        }

        await retorno_ted.create({
          ted_id:
            arrayDetalhe[contagem].ted_id === ''
              ? null
              : arrayDetalhe[contagem].ted_id,
          status_banco:
            arrayDetalhe[contagem].id_codigo_retorno_ocorrencia === ''
              ? null
              : arrayDetalhe[contagem].id_codigo_retorno_ocorrencia,
          json_retorno: arrayDetalhe[contagem]
        });
        contagem += 1;
      }
    }

    return 200;
  } catch (error) {
    Log.erro({ headers: { nulo: true } }, 'Erro ao Fazer leitura do retorno', {
      erro: error.stack
    });
    return 400;
  }
};
