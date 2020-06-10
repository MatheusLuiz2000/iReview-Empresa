import AWS from 'aws-sdk';
import Log from 'log-gcb';

export default async link => {
  return new Promise((resolve, reject) => {
    AWS.config.update({ region: 'us-east-1' });

    const [, Key] = link.split('.s3.amazonaws.com/');

    // Create S3 service object
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      accessKeyId: 'AKIAUQBZ2ECKT55I6NTB',
      secretAccessKey: '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'
    });

    let getParams = {
      Bucket: 'adiantesa',
      Key
    };

    s3.getObject(getParams, function(err, data) {
      if (err) {
        Log.erro(
          process.env.HEADERS_GLOBAIS,
          'Erro ao Receber Remessa - nao foi possivel processar o link',
          {
            erro: err
          }
        );

        resolve('erro');
      } else {
        resolve(data.Body.toString()); // this will log data to console
      }
    });
  });
};
