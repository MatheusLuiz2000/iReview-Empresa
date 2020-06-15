require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  },
  dialectOptions: {
    useUTC: true // for reading from database
  },
  timezone: '-03:00',
  pool: {
    max: 10,
    min: 5,
    idle: 80000
  }
};
