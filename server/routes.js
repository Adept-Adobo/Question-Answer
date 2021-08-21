const router = require('express').Router();
const controller = require('./controller');

router.get('/', (req, res) => {
  res.send('hello');
});

router.get('/loaderio-961dc0d3598dba0f66ca49447c374b90.txt', (req, res) => {
  res.send('loaderio-961dc0d3598dba0f66ca49447c374b90');
});

router.get('/questions/:product_id', controller.questions.get);

module.exports = router;
///
