/* eslint-disable camelcase */
const model = require('../model');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.params;
    model.questions.getQuestions(product_id)
      .then((result) => res.status(200).send(result.rows[0].jsonb_build_object))
      .catch((err) => { res.status(404).send(err); });
  },
  post: (req, res) => {
    const {
      product_id, body, date_written, username,
    } = req.body;
    model.questions.addQuestion(product_id, body, date_written, username)
      .then(() => res.status(200).send('added a row'))
      .catch((err) => { res.status(404).send(err); });
  },
};
