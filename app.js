const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');

const Sequelize = require('sequelize');
const IndexRouter = require('./routes/route');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = new Sequelize(...config.get('dbConfig'));

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/api', new IndexRouter(sequelize));
app.get('*', (req, res) => res.render('index'));

module.exports = app;
