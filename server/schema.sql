DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

drop table if exists users;
create table if not exists users (
  id serial primary key unique,
  username char(60),
  user_email char(140)
);


-- go to the file that have the user fields?
-- init users
--

-- drop table if exists products;
-- create table if not exists products (
--   product_id serial primary key unique,
--   product_name char(60),
--   slogan char(1000),
--   category char(40),
--   default_price integer
-- );

drop table if exists questions;
create table if not exists questions (
  id serial primary key unique,
  product_id integer,
  body char(1000),
  date_written bigint,
  asker_name char(80),
  asker_email char(80),
  reported integer,
  helpful integer
);





drop table if exists answers;
create table if not exists answers (
  id serial primary key unique,
  -- question_id integer references questions (question_id),
  question_id integer,
  body char(1000),
  date_written bigint,
  answerer_name char(80),
  answerer_email char(80),
  reported integer,
  helpful integer
);

-- drop table if exists photos;
-- create table if not exists photos (
--   photo_id serial primary key unique,
--   photo_url char(1000),
--   answer_id integer references answers (answer_id)
-- );

-- 1,36,"Supposedly suede, but I think its synthetic",1599958385988,"sillyguy","first.last@gmail.com",0,1
-- 2,13,"Some kind of recycled rubber, works great!",1615008233634,"marcanthony","first.last@gmail.com",0,2
-- 3,23,"Some kind of recycled rubber, works great!",1592693405366,"iluvdogz","first.last@gmail.com",0,3
-- insert into
  -- answers (id, question_id, body, date_written, answerer_name, answerer_email,
  -- reported, helpful
  -- )
-- values
--   (1,36,'Supposedly suede, but I think its synthetic',1599958385988,'sillyguy','first.last@gmail.com',0,1),

--   (2,13,'Some kind of recycled rubber, works great!',1615008233634,'marcanthony','first.last@gmail.com',0,2),

--   (3,23,'Some kind of recycled rubber, works great!',1592693405366,'iluvdogz','first.last@gmail.com',0,3)

--   returning id;

copy questions(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) from '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/questions.csv' with (format csv, delimiter ',', header);

copy answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) from '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/answers.csv' with (format csv, delimiter ',', header);

insert into users (username, user_email)
select answerer_name, answerer_email
from answers;

insert into users (username, user_email)
select asker_name, asker_email
from questions;

copy (select * from users) to '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/users.csv' with CSV delimiter ',' header;



