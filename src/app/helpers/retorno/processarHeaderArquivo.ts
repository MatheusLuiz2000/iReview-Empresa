export default async (linha) => {

  const dados = {
    banco : linha.substr(1, 3).trim(), //NUMERICO //Código do Banco na Compensação
    lote : linha.substr(4, 4).trim(), //num - default 0000 //Lote de Serviço
    registro : linha.substr(8, 1).trim(), //num - default 0 //Tipo de Registro
    cnab1 : linha.substr(9, 9).trim(), //BRANCOS //Uso Exclusivo FEBRABAN / CNAB
    tipo_inscricao_empresa : linha.substr(18, 1).trim(), //num - 1-CPF, 2-CGC //Tipo de Inscrição da Empresa
    num_inscricao_empresa : linha.substr(19, 14).trim(), //numerico  //Número de Inscrição da Empresa
    cod_convenio : linha.substr(33, 20).trim(), //alfanumerico  //Código do Convênio no Banco
    agencia : linha.substr(53, 5).trim().replace(/^0+/, ''), //numerico //Agência Mantenedora da Conta
    dv_agencia : linha.substr(58, 1).trim(), //alfanumerico //DV da Agência
    conta_corrente : linha.substr(59, 12).trim().replace(/^0+/, ''), //numerico //Número da Conta Corrente
    dv_conta : linha.substr(71, 1).trim(), //alfanumerico  //DV da Conta Corrent
    dv_ag_conta : linha.substr(72, 1).trim(), //alfanumerico 
    nome_empresa : linha.substr(73, 30).trim(), //alfanumerico 
    nome_banco : linha.substr(103, 30).trim(), //alfanumerico 
    uso_febraban_cnab2 : linha.substr(133, 10).trim(), //brancos //Uso Exclusivo FEBRABAN / CNAB
    cod_arq : linha.substr(143, 1).trim(), //num - 1-REM E 2-RET ?? //Código do arquivo de remessa/retorno
    data_geracao_arq : linha.substr(144, 8).trim(), //num - formato ddmmaaaa
    hora_geracao_arq : linha.substr(152, 6).trim(), //num - formato hhmmss
    sequencia : linha.substr(158, 6).trim(), //numerico //Número Sequencial do Arquivo
    versao_layout_arq : linha.substr(164, 3).trim(), //num 084 //Num da Versão do Layout do Arquivo
    densidade : linha.substr(167, 5).trim(), //numerico //Densidade de Gravação do Arquivo
    reservado_banco : linha.substr(172, 20).trim(), //alfanumerico //Para Uso Reservado do Banco
    reservado_empresa : linha.substr(192, 20).trim(), //alfanumerico //Para Uso Reservado da Empresa
    uso_febraban_cnab3 : linha.substr(212, 29).trim() //brancos //Uso Exclusivo FEBRABAN / CNAB
  };

  return dados;
}