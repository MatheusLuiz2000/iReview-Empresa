import request from 'supertest';
import app from '../src/app';
import truncate from './util/truncate';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import ClienteTest from '../__tests__/json_test/ClienteTest.json';
import Ted_model from './../src/app/models/Ted';
import MockDate from 'mockdate';
import moment from 'moment';
import mockery from 'mockery';
import Bluebird from 'bluebird';
import Retorno_ted from '../src/app/models/Retorno_ted';
import json_retorno_test from './json_test/RetornoBanco.json';
import fs from 'fs';

const axiosMock = new MockAdapter(axios);

describe('Apidoc', () => {

  beforeEach(async () => {
    console.log("tete");
    await truncate();
  });

  it('sucesso ao acessar a documentação', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it('Deve dar errado devido que o Cliente, banco e endereco estão vazios', async () => {
    console.log("aq");
    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, {
      "data": {
        "Cliente": null,
        "Banco": null,
        "Endereco": null
      }
    });

    const response = await request(app)
      .post('/teds/cadastrar/')
      .send({
        "cliente_id": 1,
        "operacao_id": 1
      });

    expect(response.status).toBe(400);
  });

  it('Deve dar errado devido que o Banco e endereco estão vazios', async () => {
    console.log("aq2");
    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, {
      "data": {
        "Cliente": {
          "id": 1,
          "email": "matheusluiz200599@gmail.com",
          "documento": "29488796000155",
          "senha": "12312312321321312e21",
          "razao_social": "Débora e Gael Corretores Associados Ltda",
          "fantasia": "FANTASIA e Gael Corretores Associados Ltda",
          "codigo_validacao": "312321312S2S2",
          "expiracao_codigo": "2020-03-02T16:24:03.748Z",
          "limite": "1200.000",
          "grupo_autorizacao": 1,
          "grupo_consulta": 1,
          "tipo_aprovacao_id": 1,
          "etapa_cadastro": 1,
          "recebe_email": 1,
          "validado": 1,
          "desativado_em": null,
          "criado_em": "2020-03-02T16:24:03.748Z",
          "atualizado_em": "2020-03-02T16:24:03.748Z"
        },
        "Banco": null,
        "Endereco": null
      }
    });

    const response = await request(app)
      .post('/teds/cadastrar/')
      .send({
        "cliente_id": 1,
        "operacao_id": 1
      });

    expect(response.status).toBe(400);
  });

  it('Deve dar errado devido que o Banco e endereco estão vazios', async () => {
    console.log("aq3");

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, {
      "data": {
        "Cliente": {
          "id": 1,
          "email": "matheusluiz200599@gmail.com",
          "documento": "29488796000155",
          "senha": "12312312321321312e21",
          "razao_social": "Débora e Gael Corretores Associados Ltda",
          "fantasia": "FANTASIA e Gael Corretores Associados Ltda",
          "codigo_validacao": "312321312S2S2",
          "expiracao_codigo": "2020-03-02T16:24:03.748Z",
          "limite": "1200.000",
          "grupo_autorizacao": 1,
          "grupo_consulta": 1,
          "tipo_aprovacao_id": 1,
          "etapa_cadastro": 1,
          "recebe_email": 1,
          "validado": 1,
          "desativado_em": null,
          "criado_em": "2020-03-02T16:24:03.748Z",
          "atualizado_em": "2020-03-02T16:24:03.748Z"
        },
        "Banco": null,
        "Endereco": null
      }
    });

    const response = await request(app)
      .post('/teds/cadastrar/')
      .send({
        "cliente_id": 1,
        "operacao_id": 1
      });

    expect(response.status).toBe(400);
  });

  it('Deve dar errado devido que o endereco está vazio', async () => {
    console.log("aq4");

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, {
      "data": {
        "Cliente": {
          "id": 1,
          "email": "matheusluiz200599@gmail.com",
          "documento": "29488796000155",
          "senha": "12312312321321312e21",
          "razao_social": "Débora e Gael Corretores Associados Ltda",
          "fantasia": "FANTASIA e Gael Corretores Associados Ltda",
          "codigo_validacao": "312321312S2S2",
          "expiracao_codigo": "2020-03-02T16:24:03.748Z",
          "limite": "1200.000",
          "grupo_autorizacao": 1,
          "grupo_consulta": 1,
          "tipo_aprovacao_id": 1,
          "etapa_cadastro": 1,
          "recebe_email": 1,
          "validado": 1,
          "desativado_em": null,
          "criado_em": "2020-03-02T16:24:03.748Z",
          "atualizado_em": "2020-03-02T16:24:03.748Z"
        },
        "Banco": {
          "id": 1,
          "tipo_bancos_id": 2,
          "cliente_id": 1,
          "agencia": "2323",
          "conta": "83283",
          "digito": "1",
          "tipo_conta": 1,
          "principal": true,
          "desativado_em": null,
          "criado_em": "2020-03-02T16:24:03.768Z",
          "atualizado_em": "2020-03-02T16:24:03.768Z",
          "codigo_banco": "341"
        },
        "Endereco": null
      }
    });

    const response = await request(app)
      .post('/teds/cadastrar/')
      .send({
        "cliente_id": 1,
        "operacao_id": 1
      });

    expect(response.status).toBe(400);
  });

  it('Deve dar certo a criacao da solicitação de ted', async () => {
    console.log("aq5");

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, ClienteTest);

    const response = await request(app)
      .post('/teds/cadastrar/')
      .send({
        "cliente_id": 1,
        "operacao_id": 1
      });

    expect(response.status).toBe(200);
  });

  it('Deve dar certo porém deve retornar dados nulo devido que não existe nenhuma solicitação de TED.', async () => {
    console.log("aq6");

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, ClienteTest);

    const response = await request(app)
      .post('/teds/gerar/')

    expect(Object.entries(response.body.data).length).toBe(0);
    expect(response.status).toBe(200);
  });

  it('Deve dar errado', async () => {
    console.log("aq7");
    await Ted_model.create({
      id: 232,
      cliente_id: 1,
      operacao_id: 1,
      identificacao: null,
      remessa_id: null,
      json_dados: null
    });

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(409, ClienteTest);

    const response = await request(app)
      .post('/teds/gerar/')

    console.log(response.body);

    expect(response.status).toBe(200);
  });

  it('Deve dar certo porém nao foi possivel recuperar os dados do cliente', async () => {
    console.log("aq8");

    await Ted_model.create({
      id: 232,
      cliente_id: 1,
      operacao_id: 1,
      identificacao: null,
      remessa_id: null,
      json_dados: null
    });

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(409, ClienteTest);

    const response = await request(app)
      .post('/teds/gerar/')

    expect(response.body.data[0].motivo).toBe("Localizar o cliente");
    expect(response.status).toBe(200);
  });

  it('Deve dar certo porém falhou em 2 validacoes(banco e endereco)', async () => {

    console.log("aq9");

    await Ted_model.create({
      id: 233,
      cliente_id: 1,
      operacao_id: 1,
      identificacao: null,
      remessa_id: null,
      json_dados: null
    });

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, {
      "data": {
        "Cliente": {
          "id": 1,
          "email": "matheusluiz200599@gmail.com",
          "documento": "29488796000155",
          "senha": "12312312321321312e21",
          "razao_social": "Débora e Gael Corretores Associados Ltda",
          "fantasia": "FANTASIA e Gael Corretores Associados Ltda",
          "codigo_validacao": "312321312S2S2",
          "expiracao_codigo": "2020-03-02T16:24:03.748Z",
          "limite": "1200.000",
          "grupo_autorizacao": 1,
          "grupo_consulta": 1,
          "tipo_aprovacao_id": 1,
          "etapa_cadastro": 1,
          "recebe_email": 1,
          "validado": 1,
          "desativado_em": null,
          "criado_em": "2020-03-02T16:24:03.748Z",
          "atualizado_em": "2020-03-02T16:24:03.748Z"
        },
        "Banco": null,
        "Endereco": null
      }
    }
    );

    const response = await request(app)
      .post('/teds/gerar/')

    expect(response.body.data[0].validacoes[0].dado).toBe("Banco");
    expect(response.body.data[0].validacoes[1].dado).toBe("Endereço");

    expect(response.status).toBe(200);
  });

  it('Deve dar certo porém deve ser efetuada na mão devido que que o horario é menor que 13:00', async () => {

    var date = moment().format('YYYY MM DD');
    var time = "18:00";

    var timeAndDate = moment(date + ' ' + time);

    MockDate.set(moment(timeAndDate).format("DD/MM/YYYY H:mm:ss"));

    await Ted_model.create({
      id: 244,
      cliente_id: 1,
      operacao_id: 1,
      identificacao: null,
      remessa_id: null,
      json_dados: null
    });

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, ClienteTest
    );

    const response = await request(app)
      .post('/teds/gerar/')

    expect(response.body.data[0].motivo).toBe("Ted deve ser efetuada manualmente");
    expect(response.status).toBe(200);
  });

  it('Deve dar certo e gerar o arquivo', async () => {

    var date = moment().format('YYYY MM DD');
    var time = "12:00";

    var timeAndDate = moment(date + ' ' + time);

    MockDate.set(moment(timeAndDate).format("DD/MM/YYYY H:mm:ss"));

    await Ted_model.create({
      id: 245,
      cliente_id: 1,
      operacao_id: 1,
      identificacao: null,
      remessa_id: null,
      json_dados: null
    });

    axiosMock.onGet(new RegExp(`${process.env.CLIENTE_BASE}/*`)).reply(200, ClienteTest
    );

    const response = await request(app)
      .post('/teds/gerar/')

    expect(response.status).toBe(200);
  });

  it('Deve dar certo e ler o arquivo corretamente', async () => { 

    const response = await request(app)
      .post('/teds/ler/retorno')
      .send({
        link_s3: "https://adiantesa-dev.s3.amazonaws.com/uploads/retorno/deposito/2019/10/REMESSA16860_1809201946.RET.20190918141820410"
      });

    const buscaretornoTeds = await Retorno_ted.findAll();

    let lastId = "";

    buscaretornoTeds.forEach(function(i, idx, array){
      if (idx === array.length - 1){ 
          lastId = i.id; 
      }
    });

    const buscaretornoTed = await Retorno_ted.findOne({
      where: {
        id: Number(lastId)
      }
    });

    const json_retorno = buscaretornoTed.dataValues.json_retorno;

    expect(json_retorno).toStrictEqual(json_retorno_test);

    expect(response.status).toBe(200);
  });

});
