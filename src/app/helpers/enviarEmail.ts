import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export default async function(
  tipo,
  id_transacao,
  email,
  titulo,
  numero_parcelas,
  valor_parcelas,
  total,
  nome,
  motivo
) {
  let transporter = await nodemailer.createTransport(
    {
      host: 'smtp.googlemail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'pagamentos@cursobeta.com.br', // generated ethereal user
        pass: 'Pg@2406cB$' // generated ethereal password
      }
    },
    data2 => {
      console.log(data2);
    }
  );

  let emailHTML = '';

  switch (tipo) {
    case 1:
      emailHTML = '../../emails/sucesso.html';
      break;
    case 2:
      emailHTML = '../../emails/aguardando.html';
      break;
    case 3:
      emailHTML = '../../emails/erro.html';
      break;
    default:
      break;
  }

  const filePath = path.join(__dirname, emailHTML);
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  const replacements = {
    titulo,
    id_transacao,
    numero_parcelas,
    valor_parcelas: valor_parcelas.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    total: total.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    nome,
    motivo
  };

  const htmlToSend = template(replacements);

  let info = await transporter.sendMail(
    {
      from: 'pagamentos@cursobeta.com.br', // sender address
      to: email, // list of receivers
      subject: `Curso Beta Pagamentos - #Transação ${id_transacao}`, // Subject line
      text: `Curso Beta Pagamentos - #Transação ${id_transacao}`, // plain text body
      html: htmlToSend
    },
    (data1, data2) => {
      console.log('data', data1);
      console.log('data2', data2);
    }
  );

  return true;
}
