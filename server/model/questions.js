/* eslint-disable camelcase */
const SQL = require('sql-template-strings');
const pool = require('../db');

const getQuestions = async (product_id) => {
  const query = (SQL`
  SELECT jsonb_build_object(
  'results', (
    SELECT jsonb_agg(jsonb_build_object(
      'question_id', q.id,
      'question_body', q.body,
      'question_date', q.date_written,
      'asker_name', (
        SELECT u.username FROM users u WHERE u.id = q.asker_id LIMIT 1
      ),
      'question_helpfulness', q.helpful,
      'reported', q.reported,
      'answers', (
        SELECT jsonb_object_agg(a.id, jsonb_build_object(
          'id', a.id,
          'body', a.body,
          'date', a.date_written,
          'answerer_name', (
            SELECT u.username FROM users u where u.id = a.answerer_id LIMIT 1
          ),
          'helpfulness', a.helpful,
          'photos', (
            SELECT jsonb_agg((jsonb_build_object(
              'id', pho.id,
              'url', pho.url
            )))
            FROM photos pho
            WHERE pho.answer_id = a.id
          )
        ))
        FROM answers a
        WHERE a.question_id = q.id
      )
    ))
    FROM questions q
    WHERE q.product_id = p.id
  )
)
FROM products p
WHERE p.id = ${product_id};
  `);

  const value = [product_id];
  const client = await pool.connect();
  try {
    return await client.query(query, value);
  } finally {
    client.release();
  }
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
