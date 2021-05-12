import axios from 'axios';

class EAD {
  async registraUsuario(dados) {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.EAD_URL}/api/users`,
        data: {
          email: dados.customer.email,
          name: dados.customer.nome
        }
      });

      return { status: response.status, data: response.data };
    } catch (err) {
      console.log(err);
      if (err.response)
        return { status: err.response.status, data: err.response.data };

      if (err.request) return { status: 404, data: err.request };

      return { status: 500, data: err };
    }
  }

  async efetivaMatricula(user_id, tipo, turma_id) {
    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.EAD_URL}/api/efetivaMatricula`,
        data: {
          user_id,
          tipo,
          turma_id
        }
      });

      return { status: response.status, data: response.data };
    } catch (err) {
      console.log('erro efetivar matricula', err);
      if (err.response)
        return { status: err.response.status, data: err.response.data };

      if (err.request) return { status: 404, data: err.request };

      return { status: 500, data: err };
    }
  }
}

export default new EAD();
