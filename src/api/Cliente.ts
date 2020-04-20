import axios from 'axios';
import 'dotenv/config';

class ConsultaCliente {
  public async consulta(id) {
    let consulta: Object;

    try {
      consulta = await axios({
        method: 'get',
        headers: {
          endereco: true,
          banco: true
        },
        url: `${process.env.CLIENTE_BASE}/cliente/${id}`
      });
      return {
        status: consulta.status,
        data: consulta.data
      };
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          data: error.response.data
        };
      }
      if (error.request) {
        return {
          status: 404,
          data: error.request
        };
      }
      return {
        status: 500,
        data: error
      };
    }
  }
}

export default new ConsultaCliente();
