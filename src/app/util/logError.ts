import Log from '../models/Log';

export default function(descricao, json) {
  Log.create({
    descricao,
    json
  });
}
