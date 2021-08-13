

insert into
  users (
    username, user_email
  )
values
  ('sillyguy','first.last@gmail.com'),
  ('iluvdogz','first.last@gmail.com');

copy (select * from users) to '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/users.csv' with CSV delimiter ',' header;

insert into
  questions (
    id, product_id, body, date_written, asker_name, akser_email, reported, helpful
  )
  values
  (
    4,1,'How long does it last?',1594341317010,'funnygirl','first.last@gmail.com',0,6
  );

  copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) from '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/answers.csv' with (format csv, delimiter ',', header);




insert into
  users (
    username, user_email
  )
values
  ('sillyguy','first.last@gmail.com'),
  ('iluvdogz','first.last@gmail.com'),
  ('AbbigaiCollins80','Clare.Bruen29@hotmail.com'),
  ('Abbey_McCullough83', 'Jameson45@gmail.com'),
  ('coolkid','first.last@gmail.com'),
  ('funnygirl','first.last@gmail.com');

  insert into
    questions (
    id, product_id, body, date_written, asker_name, asker_email, reported, helpful
    )
  values
    (4,1,'How long does it last?',1594341317010,'funnygirl','first.last@gmail.com',0,6),

    (8,2,'Is this product sustainable?',1608855284662,'coolkid','first.last@gmail.com',1,5);

copy
  users(id, username, user_email)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/users.csv'
with (format csv, delimiter ',', header);


-- read data from csv to questions
copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) from '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/questions.csv' with (format csv, delimiter ',', header);

insert into
  answers (id, question_id, body, date_written, answerer_name, answerer_email,
  reported, helpful
  )
values
  (1,36,'Supposedly suede, but I think its synthetic',1599958385988,'sillyguy','first.last@gmail.com',0,1),

  (2,13,'Some kind of recycled rubber, works great!',1615008233634,'marcanthony','first.last@gmail.com',0,2),

  (3,23,'Some kind of recycled rubber, works great!',1592693405366,'iluvdogz','first.last@gmail.com',0,3)


-- left outer join answers and users
copy
  (select answers.id, question_id, body, date_written, users.id as answer_id, reported, helpful
  from answers
  left outer join users
  on answers.answerer_name = users.username
  order by id asc
  )
to
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/transformed_answers.csv'
with
  CSV delimiter ',' header;

-- left outer join questions and users
copy
  (select questions.id, product_id, body, date_written, users.id as asker_id, reported, helpful
  from questions
  left outer join users
  on questions.asker_name = users.username
  )
to
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/transformed_questions.csv'
with
  CSV delimiter ',' header;