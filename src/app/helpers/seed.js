'use strict;';

let { spawnSync } = require('child_process');

export default function seed() {
  spawnSync('yarn', ['sequelize', 'db:seed:all']);
}
