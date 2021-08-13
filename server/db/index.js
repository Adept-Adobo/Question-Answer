const { Pool } = require('pg');
const {
  user, password, database, port,
} = require('../config');

const pool = new Pool({
  user,
  password,
  database,
  port,
});

pool.connect((err) => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('Connected to database!');
  }
});

module.exports = pool;
