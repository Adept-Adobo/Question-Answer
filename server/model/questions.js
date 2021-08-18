/* eslint-disable camelcase */
const pool = require('../db');

const getQuestions = (product_id) => {
  const query = 'select * from questions where product_id = $1';
  const value = [product_id];
  return pool.query(query, value);
};

const addQuestion = (product_id, body, date_written, username) => {
  const value = [parseInt(product_id, 10), body, parseInt(Date.now(), 10), username];
  const query = 'select users.id from users where username = $1';
  const query2 = `
    insert into questions(product_id, body, date_written, asker_id) values ($1, $2, $3, $4) returning *;
  `;
  return pool.query(query, [value[3]])
    .then((result) => result.rows[0].id)
    .then((result) => pool.query(query2, [value[0], value[1], value[2], result]))
    .catch((err) => console.error(err));
};

module.exports = {
  getQuestions, addQuestion,
};
