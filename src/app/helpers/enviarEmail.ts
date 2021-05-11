import nodemailer from 'nodemailer';

export default async function(dados) {
  const {} = dados;

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
      to: 'matheusluiz200599@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    },
    (data1, data2) => {
      console.log('data', data1);
      console.log('data2', data2);
    }
  );

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
