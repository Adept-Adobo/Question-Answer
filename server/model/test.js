const pool = require('../db');

pool
  .query('select * from photos order by id asc limit 10')
  .then(console.log)
  .catch((e) => console.error(e));
