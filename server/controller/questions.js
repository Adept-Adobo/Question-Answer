const model = require('../model');

module.exports = {
  get: (req, res) => {
    const {product_id} = req.params;
    model.questions.getQuestions(product_id)
      .then((result) => res.status(200).send(result.rows))
      .catch((err) => { res.status(404).send(err); });
  },

};
