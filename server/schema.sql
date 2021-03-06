DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

drop table if exists users cascade;
create table if not exists users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  username varchar(40),
  user_email varchar(140)
);

copy
  users(id, username, user_email)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/trim_users.csv'
with
  (format csv, delimiter ',', header);


drop table if exists products cascade;
create table if not exists products (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  product_name varchar(60),
  slogan varchar(140),
  description varchar(1000),
  category varchar(40),
  default_price integer
);

copy
  products(id, product_name, slogan, description, category, default_price)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/product.csv'
with
  (format csv, delimiter ',', header);


drop table if exists questions cascade;
create table if not exists questions (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  product_id integer references products(id),
  body varchar(1000),
  date_written bigint,
  asker_id integer references users(id),
  reported integer default 0,
  helpful integer default 0
);

copy
  questions(id, product_id, body, date_written, asker_id, reported, helpful)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/clean_questions.csv'
with
  (format csv, delimiter ',', header);


drop table if exists answers cascade;
create table if not exists answers (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  question_id integer references questions(id),
  body varchar(1000),
  date_written bigint,
  answerer_id integer references users(id),
  reported integer default 0,
  helpful integer default 0
);

copy
  answers(id, question_id, body, date_written, answerer_id, reported, helpful)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/clean_answers.csv'
with
  (format csv, delimiter ',', header);


drop table if exists photos;
create table if not exists photos (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  answer_id integer references answers(id),
  url text
);

copy
  photos(id, answer_id, url)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/answers_photos.csv'
with
  (format csv, delimiter ',', header);

create index product_questions on questions(product_id);
create index asker_questions on questions(asker_id);

create index question_answers on answers(question_id);
create index answerer_answers on answers(answerer_id);

create index username_users on users(username);
create index answer_photos on photos(answer_id);



select setval('answers_id_seq', (select max(id) from answers));

select setval('photos_id_seq', (select max(id) from photos));

select setval('products_id_seq', (select max(id) from products));

select setval('questions_id_seq', (select max(id) from questions));

select setval('users_id_seq', (select max(id) from users));