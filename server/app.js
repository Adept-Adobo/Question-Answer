const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use('/qa', router);

module.exports = app;
