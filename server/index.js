/* eslint-disable camelcase */
const express = require('express');
const { getQuestions } = require('./model/questions.js');
const pool = require('./db');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/qa/questions/:product_id', (req, res) => {
  const { product_id } = req.params;
  getQuestions(product_id)
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => { res.status(404).send(err); });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;

});

app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`);
});
