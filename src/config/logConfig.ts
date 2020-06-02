import pacote from '../../package.json';

export default {
  aws_region: process.env.AWS_REGION,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_key_id: process.env.AWS_SECRET_ACCESS_KEY,
  nome_api: 'adiante-ted',
  fila_sqs_develop:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs.fifo',
  fila_sqs_master: process.env.SQS_QUEUE,
  fila_sqs_develop_prioridade:
    'https://sqs.sa-east-1.amazonaws.com/544005205437/logs-erro.fifo',
  fila_sqs_master_prioridade: process.env.SQS_PRIORITY_QUEUE,
  ambiente: process.env.NODE_ENV ? process.env.NODE_ENV : 'sem informacoes',
  versao: pacote.version ? pacote.version : 'sem informacoes',
  forcarLog: true
};
