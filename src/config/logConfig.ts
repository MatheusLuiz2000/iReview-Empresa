export default {
  region: 'sa-east-1',
  accessKeyId: 'AKIAX5KJ4VW6WUNTQA6S',
  secretAccessKey: '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',
  nomeApi: 'adiante-cliente',
  filaDev: 'https://sqs.sa-east-1.amazonaws.com/544005205437/logs.fifo',
  filaMaster: '',
  filaDevPrioridade:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-erro.fifo',
  filaMasterPrioridade: '',
  env: process.env.NODE_ENV,
  forcarLog: true
};
