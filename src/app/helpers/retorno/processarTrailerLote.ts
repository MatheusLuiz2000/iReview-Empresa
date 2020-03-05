export default async (linha) => {

  const dados = {
    banco: linha.substr(1, 3), //numerico  //Código do Banco na Compensação
    lote: linha.substr(4, 4), //numerico //Lote de Serviço
    registro: linha.substr(8, 1), //num - default 5 //Tipo de Registro
    quantidade_registros: linha.substr(18, 6).replace(/^0+/, ''), //numerico //Quantidade de Registros do Lote
    valor_total_pagamentos: (parseFloat(linha.substr(24, 18).replace(/^0+/, '')) * 0.01).toFixed(2), //numerico, 2 casas decimais  //Somatória dos Valores
    ocorrencias: linha.substr(231, 10).trim() //alfa  //Códigos das Ocorrências para Retorno
  }
  return dados;
}