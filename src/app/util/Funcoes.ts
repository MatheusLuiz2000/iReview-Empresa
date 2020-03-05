import S3 from 'aws-sdk/clients/s3';
import codigos_retorno from '../models/Codigo_retorno_banco';
import ted from '../models/Ted';

class Funcoes {
  public async removerCaractersEspeciais(string) {
    let formatado;
    try {
      formatado = string.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z-:,/.\s])/g, '');
      return formatado;
    } catch (error) { }

  }

  public async salvarS3(body) {

    const s3 = new S3({
      apiVersion: '2006-03-01',
      accessKeyId: 'AKIAUQBZ2ECKT55I6NTB',
      secretAccessKey: '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'
    });

    const params = {
      Bucket: 'adiantesa',
      Key: `teste/uploads/remessas/${new Date().getFullYear()}/${new Date().getUTCMonth() +
        1}/${new Date().getUTCDate()}/${new Date().getTime()}.rem`,
      Body: body
    };

    try {
      const { Location } = await s3.upload(params).promise();
      return Location;
    } catch (err) {
      return false;
    }
  }

  public async criaArray(data) {
    let array = [];

    if (data instanceof Array) array = data;
    else array.push(data);

    return array;
  }

  public async formata_cedente(cedente) {
    let cedente_split = cedente.split("-");
    let cedente_formatado = "";

    cedente_split.forEach(element => {
      cedente_formatado += element.substr(0, 1).toUpperCase() + element.substr(1) + " ";
    });

    return cedente_formatado;
  }

  public async agencia_conta(string) {

    let agencia_formatado = string.substr(1, 4);
    let conta_formatado = string.substr(7, 12).replace(/^0+/, '');
    let digito = string.substr(19, 1);

    // string = string.split(" ");
    // conta_formatado += string[1].replace(/^0+/, '') + " - " + string[2];
    return {
      agencia_formatado,
      conta_formatado,
      digito
    }
  }

  public async formata_moeda(valor) {

    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);

  }

  public async buscaDescricao(descricao) {

    const buscaDescricao = await codigos_retorno.findOne({
      attributes: ['id','codigo','mensagem'],
      where: {
        codigo: descricao,
      }
    });

    if(!buscaDescricao) {
      return false;
    }
    
    return buscaDescricao.dataValues;
  }

  public async buscaTedId(uso_empresa) {

    const buscaTedId = await ted.findOne({
      where: {
        identificacao: uso_empresa,
      }
    });

    if(!buscaTedId) {
      return false;
    }
    
    return buscaTedId.dataValues.id;

  }
}
export default new Funcoes();