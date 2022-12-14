'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const logger = require('./middleware/logger');

const validator = require('./middleware/validator');

const notFound = require('./handlers/404');

const errorHandler = require('./handlers/500');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.use(logger);
app.use('/person', validator);


app.get('/', (req, res, next) => {
    res.status(200).send('Hello World!');
})

app.get('/person', (req, res, next) => {
    res.status(200).send(`Hello ${req.query.name}`);
});

//app.get('helloPath', (req, res, next) => {
    //res.status(200).send(`Hello ${req.pararms.individual}`);
//});


app.get('/bad', (req, res, next) => {
    next('Error!');
});

app.use('/*', notFound);

app.use(errorHandler);


function start() {
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
}

module.exports = { start, app };