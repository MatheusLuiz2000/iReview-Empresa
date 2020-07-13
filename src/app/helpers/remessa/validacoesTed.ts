export default async buscaDadosCliente => {
  const retornoDadosFaltando = new Array();
  const cliente_dados = buscaDadosCliente.data;
  const banco_dados = buscaDadosCliente.data.banco[0];
  const endereco_dados = buscaDadosCliente.data.enderecos[0];

  // Validaçoes do Cliente
  if (cliente_dados === null) {
    retornoDadosFaltando.push({
      dado: 'Cliente',
      mensagem: 'Dados do usuario insuficientes!'
    });
  } else if (!cliente_dados.documento || !cliente_dados.razao_social) {
    retornoDadosFaltando.push({
      dado: 'Cliente',
      mensagem: 'Dados do usuario insuficientes!'
    });
  }

  // Validacoes do Banco
  if (banco_dados === null) {
    retornoDadosFaltando.push({
      dado: 'Banco',
      mensagem: 'Preencha o banco para realizar a transferência'
    });
  } else if (
    !banco_dados.agencia ||
    !banco_dados.conta ||
    !banco_dados.digito ||
    banco_dados.codigo_banco === '' ||
    !banco_dados.tipo_conta
  ) {
    retornoDadosFaltando.push({
      dado: 'Banco',
      mensagem:
        'Dados Bancários Incompletos! Preencha todos os dados para realizar a transferência'
    });
  }

  // Validaçoes do Endereco
  if (endereco_dados === null) {
    retornoDadosFaltando.push({
      dado: 'Endereço',
      mensagem: 'Preencha o endereço para realizar a transferência'
    });
  } else if (!endereco_dados.cep || !endereco_dados.cep.cep) {
    retornoDadosFaltando.push({
      dado: 'Endereço',
      mensagem: 'Preencha o endereço para realizar a transferência'
    });
  }

  if (retornoDadosFaltando.length > 0) {
    return {
      status: 400,
      dados: retornoDadosFaltando
    };
  }

  return {
    status: 200
  };
};
