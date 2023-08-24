const express = require('express');
require('dotenv').config();
const path = require('path');
const routes = require('./routes/sendText');
const route = require('./routes/sendHTML');
const rout = require('./routes/sendEjs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(routes);
app.use(route);
app.use(rout);

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests')
});