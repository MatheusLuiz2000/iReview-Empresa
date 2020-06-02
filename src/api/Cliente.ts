import axios from 'axios';
import 'dotenv/config';

class ConsultaCliente {
  public async consulta(id, status = true) {
    let consulta: Object;

    try {
      consulta = await axios({
        method: 'get',
        headers: {
          endereco: true,
          banco: status
        },
        url: `${process.env.CLIENTE_BASE}/${id}`
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

  public async cliente(id, status = true) {
    let consulta: Object;

    try {
      consulta = await axios({
        method: 'get',
        headers: {
          endereco: true,
          banco: status
        },
        url: `${process.env.CLIENTE}/${id}`
      });

      return {
        status: consulta.status,
        data: consulta.data
      };
    } catch (error) {
      console.log(error);
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
