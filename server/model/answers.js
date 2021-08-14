/* eslint-disable camelcase */
const pool = require('../db');

// const question_id = 13;
const getAnswers = (question_id) => new Promise((resolve) => {
  const query = 'select * from answers where question_id = $1';
  const value = [question_id];
  resolve(
    pool.query(query, value),
  );
});

module.exports = {
  getAnswers,
};
