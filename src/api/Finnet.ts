import axios from 'axios';
import 'dotenv/config';

class ConsultaFinnet {
  public async criarRegistroRemessa(link_s3, tipo_arquivo) {
    let resposta;

    let consultaResponse = {
      status: 200,
      resposta
    };

    let consulta: Object;

    try {
      consulta = await axios({
        method: 'POST',
        url: `${process.env.FINNET_BASE}/finnet/salvar/remessa`,
        data: {
          link_s3,
          tipo_arquivo
        }
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        consultaResponse.resposta = error.response.data;
        consultaResponse.status = error.response.status;

        return consultaResponse;
      }
      if (error.request) {
        consultaResponse.resposta = '';
        consultaResponse.status = 400;

        return consultaResponse;
      }
      consultaResponse.resposta = '';
      consultaResponse.status = 500;

      return consultaResponse;
    }

    consultaResponse.resposta = consulta.data;

    return consultaResponse;
  }
}

export default new ConsultaFinnet();
