/* eslint-disable camelcase */
const pool = require('../db');

//GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.

// const query = "select * from questions where product_id = 1"
// const product_id = 10;
const getQuestions = (product_id) => new Promise((resolve) => {
  const query = 'select * from questions where product_id = $1';
  const value = [product_id];
  resolve(
    pool.query(query, value),
  );
});

module.exports = {
  getQuestions,
};
