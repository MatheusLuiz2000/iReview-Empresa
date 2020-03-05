export default async (linha) => {

  //SEGMENTO J - Pagamento de Títulos de Cobrança
  const dados = {
    banco: linha.substr(1, 3).trim(), //numerico //Código do Banco na Compensação
    lote: linha.substr(4, 4).trim(), //numerico //Lote de Serviço
    registro: linha.substr(8, 1).trim(), //num - default 1 //Tipo de Registro
    operacao: linha.substr(9, 1).trim(), //alfanumerico - default C //Tipo da Operação
    servico: linha.substr(10, 2).trim(), //num  //Tipo do Serviço
    forma_lancamento: linha.substr(12, 2).trim(), //num //Forma de Lançamento
    layout_lote: linha.substr(14, 3).trim(), //num - default '030' //No da Versão do Layout do Lote
    cnab1: linha.substr(17, 1).trim(), //alfa - default brancos  //Uso Exclusivo da FEBRABAN/CNAB
    tipo_inscricao_empresa: linha.substr(18, 1).trim(), //num - 1-CPF, 2-CGC //Tipo de Inscrição da Empresa
    num_inscricao_empresa: linha.substr(19, 14).trim(), //numerico //Número de Inscrição da Empresa
    cod_convenio: linha.substr(33, 20).trim(), //alfanumerico //Código do Convênio no Banco
    agencia: linha.substr(53, 5).trim().replace(/^0+/, ''), //numerico //Agência Mantenedora da Conta
    dv_agencia: linha.substr(58, 1).trim(), //alfanumerico //DV da Agência Mantenedora da Conta
    conta_corrente: linha.substr(59, 12).trim().replace(/^0+/, ''), //numerico 
    dv_conta: linha.substr(71, 1).trim(), //alfanumerico 
    dv_ag_conta: linha.substr(72, 1).trim(), //alfanumerico //Dígito Verificador da Ag/Conta
    nome_empresa: linha.substr(73, 30).trim(), //alfanumerico 
    mensagem1: linha.substr(103, 40).trim(), //alfanumerico 
    logradouro_empresa: linha.substr(143, 30).trim(), //alfa //Logradouro da Empresa - Nome da Rua, Av, Pça, Etc
    numero_empresa: linha.substr(173, 5).trim().replace(/^0+/, ''), //num //Número do endereço da empresa
    complemento_empresa: linha.substr(178, 15).trim(), //alfa //Complemento - Casa, Apto, Sala, Etc
    cidade_empresa: linha.substr(193, 20).trim(), //alfa //Cidade da Empresa
    cep_empresa: linha.substr(213, 5).trim(), //num //5 primeiros dígitos do CEP da Empresa
    complemento_cep_empresa: linha.substr(218, 3).trim(), //alfa //3 últimos dígitos do CEP da empresa
    estado: linha.substr(221, 2).trim(), //  alfa  //Sigla do Estado
    cnab: linha.substr(223, 8).trim(), // alfa - default brancos //Uso Exclusivo da FEBRABAN/CNAB 
    ocorrencias: linha.substr(231, 10) //alfa //Código das Ocorrências p/ Retorno  

  }


  return dados;
}