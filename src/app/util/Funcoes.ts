import S3 from 'aws-sdk/clients/s3';
import codigos_retorno from '../models/Codigo_retorno_banco';
import ted from '../models/Ted';

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY
});

class Funcoes {
  public async removerCaractersEspeciais(string) {
    let formatado;
    try {
      formatado = string
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z-:,/.\s])/g, '');
      return formatado;
    } catch (error) {}
  }

  public async salvarS3(conteudo) {
    const params = {
      Bucket: process.env.BUCKET,
      Key: `uploads/remessa/deposito/${new Date().getFullYear()}/${new Date().getUTCMonth() +
        1}/REMESSA16860_${Date.now()}.REM`,
      Body: conteudo
    };

    try {
      const { Location } = await s3.upload(params).promise();
      return {
        status: 200,
        url: Location
      };
    } catch (err) {
      return {
        status: 400,
        error: err
      };
    }
  }

  public async criaArray(data) {
    let array = [];

    if (data instanceof Array) array = data;
    else array.push(data);

    return array;
  }

  public async formata_cedente(cedente) {
    let cedente_split = cedente.split('-');
    let cedente_formatado = '';

    cedente_split.forEach(element => {
      cedente_formatado += `${element.substr(0, 1).toUpperCase() +
        element.substr(1)} `;
    });

    return cedente_formatado;
  }

  leituraRetornoTed;

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
    };
  }

  public async formata_moeda(valor) {
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  public async buscaDescricao(descricao) {
    const buscaDescricao = await codigos_retorno.findOne({
      attributes: ['id', 'codigo', 'mensagem'],
      where: {
        codigo: descricao
      }
    });

    if (!buscaDescricao) {
      return false;
    }

    return buscaDescricao.dataValues;
  }

  public async buscaTedId(uso_empresa) {
    const buscaTedId = await ted.findOne({
      where: {
        identificacao: uso_empresa
      }
    });

    if (!buscaTedId) {
      return false;
    }

    return buscaTedId.dataValues.id;
  }
}
export default new Funcoes();
