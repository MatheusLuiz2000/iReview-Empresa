import nodemailer from 'nodemailer';

export default async function(dados) {
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

  let info = await transporter.sendMail(
    {
      from: 'pagamentos@cursobeta.com.br', // sender address
      to: dados.customer.email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    },
    (data1, data2) => {
      console.log('data', data1);
      console.log('data2', data2);
    }
  );

  return true;
}
