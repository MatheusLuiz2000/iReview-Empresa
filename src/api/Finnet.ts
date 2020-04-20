import axios from 'axios';
import 'dotenv/config';

class ConsultaFinnet {
  public async criarRegistroRemessa(link_s3, tipo_arquivo) {
    let requisicao: Object;

    try {
      requisicao = await axios({
        method: 'POST',
        headers: {
          headers_anteriores: JSON.parse(process.env.HEADERS_GLOBAIS).headers
        },
        url: `${process.env.FINNET_BASE}/finnet/salvar/remessa`,
        data: {
          link_s3,
          tipo_arquivo
        }
      });
      return {
        status: requisicao.status,
        data: requisicao.data
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

export default new ConsultaFinnet();
