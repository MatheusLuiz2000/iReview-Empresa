import * as Yup from 'yup';

import limparString from '../util/limparString';

class PagamentoValidator {
  public async transacao(req, res, next) {
    if (req.body.tipo_pagamento === 'credit-card') {
      const TransacaoCreditCard = Yup.object().shape({
        nome_impresso_cartao: Yup.string('Deve ser um metódo').required(
          'Tipo de pagamento é obrigatório'
        ),
        numero_cartao: Yup.string('Deve ser um número')
          .required('Número do cartão obrigatório')
          .test('tamanho', 'Deve possuir exatamente 16 números', val => {
            if (!val) {
              return false;
            }

            if (limparString(val).length !== 16) {
              return false;
            }

            return true;
          }),
        cvv: Yup.string('Deve ser um número')
          .required('CVV do cartão obrigatório')
          .test('tamanho', 'Deve possuir exatamente 3 números', val => {
            if (!val) {
              return false;
            }

            if (limparString(val).length !== 3) {
              return false;
            }

            return true;
          }),
        expiracao_cartao: Yup.string('Deve ser uma data').required(
          'Data de expiração do cartão obrigatório'
        )
      });

      TransacaoCreditCard.validate(req.body).catch(err => {
        return res.status(400).json({ mensagem: err.message });
      });
    }

    const TransacaoSchema = Yup.object().shape({
      plataforma: Yup.string('Deve ser um número').required(
        'Plataforma é obrigatória'
      ),
      numero_parcelas: Yup.string('Deve ser um número').required(
        'Número de parcelas é obrigatória'
      ),
      valor_parcelas: Yup.string('Deve ser um número').required(
        'Valor de parcelas é obrigatória'
      ),
      total_operacao: Yup.string('Deve ser um número').required(
        'Valor total a ser cobrado é obrigatório'
      ),
      customer: Yup.object().shape({
        nome: Yup.string('Deve ser um nome').required('Nome é obrigatório'),
        tipo: Yup.string('Deve ser um tipo').required('Tipo é obrigatório'),
        pais: Yup.string('Deve ser um tipo').required('País é obrigatório'),
        email: Yup.string('Deve ser um tipo').required('E-mail é obrigatório'),
        documento: Yup.string('Deve ser um tipo').required(
          'Documento é obrigatório'
        ),
        tipo_documento: Yup.string('Deve ser um tipo').required(
          'Tipo do documento é obrigatório'
        ),
        telefone_contato: Yup.string().required(
          'Telefone para contato é obrigatório'
        ),
        data_nascimento: Yup.string('Deve ser um aniversário').required(
          'Data de nascimento é obrigatório'
        )
      }),
      billing: Yup.object().shape({
        nome: Yup.string('Deve ser um tipo').required(
          'Nome no endereço de cobrança é obrigatório'
        ),
        pais: Yup.string('Deve ser um país').required(
          'País de cobrança é obrigatório'
        ),
        estado: Yup.string('Deve ser um tipo').required(
          'Estado de cobrança é obrigatório'
        ),
        cidade: Yup.string('Deve ser um tipo').required(
          'Cidade de cobrança é obrigatório'
        ),
        bairro: Yup.string('Deve ser um tipo').required(
          'Bairro no endereço de cobrança é obrigatório'
        ),
        rua: Yup.string('Deve ser um tipo').required(
          'Rua no endereço de cobrança é obrigatório'
        ),
        numero_rua: Yup.string('Deve ser um tipo').required(
          'Número no endereço de cobrança é obrigatório'
        ),
        cep: Yup.string('Deve ser um tipo').required(
          'CEP no endereço de cobrança é obrigatório'
        )
      }),
      item: Yup.object().shape({
        id_item: Yup.string('Deve ser um titulo').required(
          'ID do produto é obrigatório'
        ),
        titulo_item: Yup.string('Deve ser um titulo').required(
          'Titulo do produto é obrigatório'
        ),
        preco_unitario: Yup.string('Deve ser uma unidade').required(
          'Preço do produto é obrigatório'
        ),
        quantidade: Yup.string('Deve ser uma quantidade').required(
          'Quantidade do produto é obrigatório'
        ),
        tangivel: Yup.string('Deve ser true/false').required(
          'Tangível ou não do produto é obrigatório'
        )
      })
    });

    TransacaoSchema.validate(req.body)
      .then(() => {
        return next();
      })
      .catch(err => {
        return res.status(400).json({ mensagem: err.message });
      });
  }
}

export default new PagamentoValidator();
