// 1 questions
// with many answers
// need to fill the photos and
// need to get the human readable date
// need to get answers photo in here

select answers.question_id,
  json_agg(row_to_json((answers.id, answers.body, answers.date_written, answers.answerer_id, answers.helpful, answers.reported)::foo)) as answers_id
from answers
  where question_id = '3518962'
group by question_id


// create type
create type foo as (answers_id int, answers_body varchar(1000), date_written bigint, answerer_id int, helpfulness int, reported int)
// 1 product
// many questions
// array of answer to each question



// this work product id - questions data
// need to get the answers photo in there
create type product_questions_answers as (question_id int, question_body varchar(1000), date_written bigint, asker_id int, helpfulness int, reported int, answers_photo json)

// select product_id,
//   (json_agg(row_to_json((t1.id, body, date_written, asker_id, helpful, reported, answers_id)::product_questions_answers))) as questions_data
// from
//   (select * from questions where product_id = '1000011') as t1
// left outer join
//   (select answers.question_id,
//     json_agg(row_to_json((answers.id, answers.body, answers.date_written, answers.answerer_id, answers.helpful, answers.reported)::foo)) as answers_id
//   from answers
//   group by question_id) as t2
// on t1.id = t2.question_id
// group by product_id

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
WHERE p.id = 100009;

// select
//             answer_id, json_agg(url) as photos
//           from photos where photos.answer_id = '5'
//           group by photos.answer_id



select product_id,
  (json_agg(row_to_json((t1.id, body, date_written, asker_id, helpful, reported, answers_id)))) as questions_data
from
  (select * from questions where product_id = '1000011') as t1
left outer join
  (select answers.question_id,
    json_agg(row_to_json((answers.id, answers.body, answers.date_written, answers.answerer_id, answers.helpful, answers.reported))) as answers_id
  from answers
  group by question_id) as t2
on t1.id = t2.question_id
group by product_id


select
  (* from questions where product_id = '1000011) as t

product_id,
  (json_agg(row_to_json((t1.id, body, date_written, asker_id, helpful, reported, answers_id)))) as questions_data
from
  (select * from questions where product_id = '1000011') as t1
left outer join
  (select answers.question_id,
    json_agg(row_to_json((answers.id, answers.body, answers.date_written, answers.answerer_id, answers.helpful, answers.reported))) as answers_id
  from answers
  group by question_id) as t2
on t1.id = t2.question_id
group by product_id
















//with photo,
// need to rebuild the photo
select product_id,
  (json_agg(row_to_json((t1.id, body, date_written, asker_id, helpful, reported, answers_data)::product_questions_answers))) as questions_data
from
  (select * from questions where product_id = '10') as t1
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
          from photos where photos.answer_id = '5'
          group by photos.answer_id
        ) as p2
      on answers.id = p2.answer_id) as p1
    ) as p
  group by question_id) as t2
on t1.id = t2.question_id
group by product_id