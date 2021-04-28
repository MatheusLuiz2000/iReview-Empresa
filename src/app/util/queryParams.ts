/* eslint-disable no-restricted-syntax */

export default function(query) {
  let objWhere = {
    where: query
  };

  for (let prop in objWhere) {
    if (objWhere[prop] === null || objWhere[prop] === undefined) {
      delete objWhere[prop];
    }
  }

  return objWhere;
}
