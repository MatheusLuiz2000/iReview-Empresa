import pacote from '../../package.json';

export default {
  aws_region: 'sa-east-1',
  aws_access_key_id: 'AKIAX5KJ4VW6WUNTQA6S',
  aws_secret_key_id: 'yYFIFGARZdr57yBv0kFGD2kbGnCsF4u2zq4DRG3R',
  nome_api: 'adiante-ted',
  fila_sqs_develop:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs.fifo',
  fila_sqs_master:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-master.fifo',
  fila_sqs_develop_prioridade:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-erro.fifo',
  fila_sqs_master_prioridade:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-master-prioridade.fifo',
  ambiente: process.env.NODE_ENV ? process.env.NODE_ENV : 'sem informacoes',
  versao: pacote.version ? pacote.version : 'sem informacoes'
};
