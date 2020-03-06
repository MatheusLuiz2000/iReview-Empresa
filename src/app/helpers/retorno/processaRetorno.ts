import processarHeaderArquivo from '../retorno/processarHeaderArquivo';
import processarHeaderLote from '../retorno/processarHeaderLote';
import processarDetalhe from '../retorno/processarDetalhe';
import processarTrailerLote from '../retorno/processarTrailerLote';
import processarTrailerArquivo from '../retorno/processarTrailerArquivo';
import rp from 'request-promise';
import retorno_ted from '../../models/Retorno_ted';

export default async (link_s3) => {

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

  try {
    const conteudoLinhas = await rp(link_s3);

    if(!conteudoLinhas) {
      return 0;
    }

    const conteudoArquivo = conteudoLinhas.split("\n");

    for (let linha of conteudoArquivo) {
      linha = " " + linha;
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
      };

      if(tipoLinha === getIdDetalhe) {
        await retorno_ted.create({
          ted_id: arrayDetalhe[0]['ted_id'] === '' ? null : arrayDetalhe[0]['ted_id'],
          status_banco: arrayDetalhe[0].id_codigo_retorno_ocorrencia === '' ? null : arrayDetalhe[0].id_codigo_retorno_ocorrencia,
          json_retorno: arrayDetalhe[0]
        });
      }
    }

    return 200;

  } catch (error) {
    return 400;
  }
}