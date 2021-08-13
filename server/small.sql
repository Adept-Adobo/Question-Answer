DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

drop table if exists users;
create table if not exists users (
  id serial primary key unique,
  username varchar(40),
  user_email varchar(140)
);

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


drop table if exists products;
create table if not exists products (
  id serial primary key unique,
  product_name varchar(60),
  slogan varchar(140),
  description varchar(1000),
  category varchar(40),
  default_price integer
);

insert into
  products (
    id, product_name, slogan, description, category, default_price
  )
  values
    (1,'Camo Onesie','Blend in to your crowd','The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.','Jackets',140),

    (2,'Bright Future Sunglasses','Youve got to wear shades','Where youre going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.','Accessories',69);

drop table if exists questions;
create table if not exists questions (
  id serial primary key unique,
  product_id integer references products(id),
  body varchar(1000),
  date_written bigint,
  asker_name varchar(40),
  asker_email varchar(100),
  reported integer,
  helpful integer
);

insert into
    questions (
    id, product_id, body, date_written, asker_name, asker_email, reported, helpful
    )
values
    (1,1,'How long does it last?',1594341317010,'funnygirl','first.last@gmail.com',0,6),

    (2,2,'Is this product sustainable?',1608855284662,'coolkid','first.last@gmail.com',1,5);

copy
  (select questions.id, product_id, body, date_written, users.id as asker_id, reported, helpful
  from questions
  inner join users
  on questions.asker_name = users.username
  order by id asc
  )
to
  '/Users/xingvoong/Desktop/hack_reactor/xing-sdc/server/db/test.csv'
with
  CSV delimiter ',' header;