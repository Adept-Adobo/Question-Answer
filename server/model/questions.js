/* eslint-disable camelcase */
const pool = require('../db');

//GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.

// const query = "select * from questions where product_id = 1"
// const product_id = 10;
const getQuestions = (product_id) => {
  const query = 'select * from questions where product_id = $1';
  const value = [product_id];
  return pool.query(query, value);
};

// const addQuestion = (body, username, email, product_id) => new Promise ((resolve) => {

// });

const test = (username) => {
  let id;
  const query = `select users.id from users where username = '${username}'`;
  const query2 = `
    insert into questions(asker_id) values ($1) returning *
  `
  pool.query(query)
    .then((result) => result.rows[0].id)
    .then((result) => pool.query(query2, [result]))
    .catch((err) => console.error(err));
};

test('coolkid');

const addQuestion = (user) => {

};

module.exports = {
  getQuestions,
};

// I need to map the user name to id so I know what id I can insert
// select users.id from users where username = to_search

// insert into
//   questions (
//     body, asker
//   )
