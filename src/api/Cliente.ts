import axios from 'axios';
import 'dotenv/config';

class ConsultaCliente {
  public async consulta(id) {

    let resposta;

    let consultaResponse = {
      status: 200,
      resposta
    }

    let consulta: Object;

    try {
      consulta = await axios({
        method: 'get',
        url: `${process.env.CLIENTE_BASE}/${id}`
      });
    } catch (error) {
      if (error.response) {
        consultaResponse.resposta = error.response.data
        consultaResponse.status = error.response.status

        return consultaResponse;
      }
      if (error.request) {
        consultaResponse.resposta = ''
        consultaResponse.status = 400

        return consultaResponse;
      }
      consultaResponse.resposta = ''
      consultaResponse.status = 500

      return consultaResponse;
    }

    consultaResponse.resposta = consulta.data;

    return consultaResponse;
  }
}

export default new ConsultaCliente();

