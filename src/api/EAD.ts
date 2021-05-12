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
    tipo = parseInt(tipo, 10);

    const objFinal = {
      user_id,
      tipo,
      ...(tipo === 1 && { turma_id }),
      ...(tipo === 2 && { combo_id: turma_id })
    };

    try {
      const response = await axios({
        method: 'post',
        url: `${process.env.EAD_URL}/api/efetivaMatricula`,
        data: objFinal
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
