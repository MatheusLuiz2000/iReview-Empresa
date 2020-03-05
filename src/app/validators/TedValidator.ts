import * as Yup from 'yup';

class TedValidator {

  public async buscaTedById(req, res, next) {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        data: {
          "mensagem": "Id Inexistente"
        }
      });
    }

    return next();
  }

  public async criaTed(req, res, next) {
    const { cliente_id, operacao_id } = req.body;

    if (!cliente_id) {
      res.status(400).json({
        data: {
          mensagem: "Cliente ID não identificado"
        }
      })
    } else if (!operacao_id) {
      res.status(400).json({
        data: {
          mensagem: "Operação ID não identificado"
        }
      })
    };

    return next();
  }

};

export default new TedValidator();
