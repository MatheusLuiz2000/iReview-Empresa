import axios from 'axios';
import IndicacaoService from '../app/services/IndicacaoService';

class AdianteGameficacao {
  async consultaTipoPontuacao(dados) {
    const {} = dados;
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.EAD_URL}/integracao`,
        data: {
          codigo_produto: dados.item.id_item,
          nome_produto: dados.item.titulo_item,
          preco: dados.item.preco_unitario,
          email_comprador: dados.customer.email,
          nome_comprador: dados.customer.nome,
          cpf_comprador: dados.customer.documento,
          telefone_comprador: dados.customer.telefone_contato,
          codigo_transacao: dados.transacao.id,
          forma_de_pagamento: dados.tipo_pagamento
        }
      });

      return { status: response.status, data: response.data };
    } catch (err) {
      if (err.response)
        return { status: err.response.status, data: err.response.data };

      if (err.request) return { status: 404, data: err.request };

      return { status: 500, data: err };
    }
  }
}

export default new AdianteGameficacao();
