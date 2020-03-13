class TedValidator {
  public async buscaTedById(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        data: {
          mensagem: 'Id Inexistente'
        }
      });
    }

    return next();
  }

  public async criaTed(req, res, next) {
    const { cliente_id, operacao_id, valor_transferencia } = req.body;

    if (!cliente_id) {
      return res.status(400).json({
        data: {
          mensagem: 'Cliente ID não identificado'
        }
      });
    }

    if (!operacao_id) {
      return res.status(400).json({
        data: {
          mensagem: 'Operação ID não identificado'
        }
      });
    }

    if (!valor_transferencia) {
      return res.status(400).json({
        data: {
          mensagem: 'Valor de transferência não identificado'
        }
      });
    }

    return next();
  }
}

export default new TedValidator();
