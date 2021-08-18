/* eslint-disable camelcase */
// const express = require('express');
// const bodyParser = require('body-parser')
// const pool = require('./db');
// const controller = require('./controller');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/qa/questions/:product_id', controller.questions.get);

// app.post('/qa/questions/:product_id', controller.questions.post);

// app.get('/qa/questions/:question_id/answers', (req, res) => {
//   const { question_id } = req.params;
//   getAnswers(question_id)
//     .then((result) => res.status(200).send(result.rows))
//     .catch((err) => { res.status(404).send(err); });
// });

// app.listen(port, () => {
//   console.log(`example app listening at http://localhost:${port}`);
// });

const app = require('./app');

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
