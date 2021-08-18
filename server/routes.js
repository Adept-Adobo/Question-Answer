const router = require('express').Router();
const controller = require('./controller');

router.get('/');

router.get('/questions/:product_id', controller.questions.get);

module.exports = router;
