const pool = require('../db');

const question_id = 13;
const getAnswers = (question_id) => {
  const query = `select * from answers where question_id = ${question_id}`;
  pool
    .query(query)
    .then(console.log)
    .catch((e) => console.error(e));
};

getAnswers(question_id);

module.exports = {
  getAnswers,
};
