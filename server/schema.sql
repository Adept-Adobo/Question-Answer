DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

drop table if exists users;
create table if not exists users (
  userid serial primary key unique,
  username char(60)
);

drop table if exists products;
create table if not exists products (
  product_id serial primary key unique,
  product_name char(60),
  slogan char(1000),
  category char(40),
  default_price integer
);

drop table if exists questions;
create table if not exists questions (
  question_id serial primary key unique,
  body char(1000),
  question_date timestamp,
  userid integer references users (userid),
  reported boolean,
  product_id integer references products (product_id)
);

drop table if exists answers;
create table if not exists answers (
  answer_id serial primary key unique,
  body char(1000),
  answer_date timestamp,
  userid integer references users (userid),
  helpfulness integer,
  question_id integer references questions (question_id)
);

