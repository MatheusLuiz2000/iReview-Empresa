export default async (linha) => {

  const dados = {
    banco: linha.substr(1, 3),//numerico  //Código do Banco na Compensação
    lote: linha.substr(4, 4),// num - default 9999  //Lote de Serviço
    registro: linha.substr(8, 1),//num - default 9   //Tipo de Registro           
    quant_lotes: linha.substr(18, 6),//num. //Quantidade de Lotes do Arquivo
    quant_regs: linha.substr(24, 6).replace(/^0+/, '')//num. //Quantidade de Registros do Arquivo
  }
  return dados;
}