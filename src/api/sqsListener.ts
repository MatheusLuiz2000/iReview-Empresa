/* eslint-disable no-console */
import { Consumer } from 'sqs-consumer';
import AWS from 'aws-sdk';

import Log from 'log-gcb';

import TedService from '../app/services/TedService';

const sleep = m => new Promise(r => setTimeout(r, m));

class Sqs {
  Start() {
    // Define Configuracoes do AWS.
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    // Inicia o Metodo Consumer, iniciando a escuta á Queue SQS.
    const app = Consumer.create({
      queueUrl: process.env.SQS_SOLICITACAO_TED,

      // Dispara uma ação quando uma mensagem é retornada.
      handleMessage: async message => {
        // console.log('entrou');

        // console.log(JSON.parse(message.Body));
        // await sleep(5000);
        // console.log('apagou');
        // return;

        const body = JSON.parse(message.Body);
        const solicitacao = await TedService.criarTed(
          body.cliente_id,
          body.operacao_id,
          body.valor_transferencia
        );
        console.log('status: ', solicitacao.status);
        if (solicitacao.status !== 200) {
          Log.erro(
            { headers: { nulo: true } },
            'Erro ao Inserir Solicitação de criação de Ted',
            {
              detalhes: solicitacao.mensagem
            }
          );
          throw new Error();
        }
      },
      sqs
    });

    app.on('error', async err => {
      Log.erro(
        { headers: { nulo: true } },
        'Erro ao Inserir Solicitação de criação de Ted',
        {
          detalhes: err
        }
      );
      app.stop();
      await sleep(60000);
      app.start();
    });

    app.on('processing_error', async err => {
      Log.erro(
        { headers: { nulo: true } },
        'Erro ao Inserir Solicitação de criação de Ted',
        {
          detalhes: err
        }
      );
      app.stop();
      await sleep(60000);
      app.start();
    });

    app.on('timeout_error', async err => {
      Log.erro(
        { headers: { nulo: true } },
        'Erro ao Inserir Solicitação de criação de Ted',
        {
          detalhes: err
        }
      );
      app.stop();
      await sleep(60000);
      app.start();
    });

    app.start();
  }
}

export default new Sqs();
