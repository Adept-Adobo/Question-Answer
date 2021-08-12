
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