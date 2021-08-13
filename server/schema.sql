DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

drop table if exists users cascade;
create table if not exists users (
  id serial primary key unique,
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
  id serial primary key unique,
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
  id serial primary key unique,
  product_id integer references products(id),
  body varchar(1000),
  date_written bigint,
  asker_id integer references users(id),
  reported integer,
  helpful integer
);

copy
  questions(id, product_id, body, date_written, asker_id, reported, helpful)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/clean_questions.csv'
with
  (format csv, delimiter ',', header);


drop table if exists answers cascade;
create table if not exists answers (
  id serial primary key unique,
  question_id integer references questions(id),
  body varchar(1000),
  date_written bigint,
  answerer_id integer references users(id),
  reported integer,
  helpful integer
);

copy
  answers(id, question_id, body, date_written, answerer_id, reported, helpful)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/clean_answers.csv'
with
  (format csv, delimiter ',', header);


drop table if exists photos;
create table if not exists photos (
  id serial primary key unique,
  answer_id integer references answers(id),
  url text
);

copy
  photos(id, answer_id, url)
from
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/answers_photos.csv'
with
  (format csv, delimiter ',', header);
