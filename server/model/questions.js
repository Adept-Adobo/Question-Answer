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

// join with question_id
select p.* from
  (select * from answers
  inner join
    (
      select
        answer_id, json_agg(url) as photos
      from photos where photos.answer_id = '5'
      group by answer_id
    ) as p2
  on answers.id = p2.answer_id) as p

select product_id,
  (json_agg(row_to_json((t1.id, body, date_written, asker_id, helpful, reported, answers_data)))) as questions_data
from
  (select * from questions where product_id = '1000011') as t1
left outer join
  (select p.question_id,
    json_agg(row_to_json((p.id, p.body, p.date_written, p.answerer_id, p.helpful, p.reported, p.photos))) as answers_data
  from
    (
      select p1.*
      from
        (select * from answers
        inner join
          (
            select
              answer_id, json_agg(url) as photos
            from photos
            group by photos.answer_id
          ) as p2
        on answers.id = p2.answer_id) as p1
    ) as p
  group by question_id) as t2
on t1.id = t2.question_id
group by product_id

//question_id = 1
//answer_id = 5


select product_id,
  (json_agg(row_to_json((t1.id, body, date_written, asker_id, helpful, reported, answers_data)))) as questions_data
from
  (select * from questions where product_id = '1000011') as t1
left outer join
  (select p.question_id,
    json_agg(row_to_json((p.id, p.body, p.date_written, p.answerer_id, p.helpful, p.reported, p.photos))) as answers_data
  from
    (
      select p1.*
      from
        (select * from answers
        inner join
          (
            select
              answer_id, json_agg(url) as photos
            from photos
            group by photos.answer_id
          ) as p2
        on answers.id = p2.answer_id) as p1
    ) as p
  group by question_id) as t2
on t1.id = t2.question_id
group by product_id
