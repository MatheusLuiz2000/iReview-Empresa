import rp from 'request-promise';
import ehDiaUtil from 'eh-dia-util';
import moment from 'moment';

export default async function(data) {
  let controle = false;

  console.log('hora que chegou na funcao: ', data);

  while (!controle) {
    controle = await diaUtil(data);

    if (controle) continue;

    data = moment(data).add(1, 'd');
  }

  return moment(data).format('DDMMYYYY');
}

async function diaUtil(data) {
  let array = [];

  const dataFormatada = moment(data).format('DD/MM/YYYY');

  const diaDaSemana = moment(data).format('E');

  // Caso seja sabado ou domingo, retorna false
  if (diaDaSemana === '6' || diaDaSemana === '7') {
    return false;
  }

  array = await rp(
    `${process.env.API_CALENDARIO_URL}/?json=true&ano=${moment(data).format(
      'YYYY'
    )}&estado=SP&cidade=SAO_PAULO&token=${process.env.API_CALENDARIO_TOKEN}`
  )
    .then(async function(htmlString) {
      return htmlString;
    })
    .catch(function(err) {
      return ehDiaUtil(data);
    });

  try {
    array = JSON.parse(array);

    const encontrou = array.find(objeto => objeto.date == dataFormatada);

    if (encontrou === undefined) {
      return true;
    }
  } catch (error) {
    // Se nao conseguir utilizar a api, utilizar a lib interna
    return ehDiaUtil(data);
  }

  return ehDiaUtil(data);
}
