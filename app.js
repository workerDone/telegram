var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Sequelize = require('sequelize');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const sequelize = new Sequelize(
    'mykola_chmut',
    'mykola_chmut',
    'mykola_chmut',
    {
        host: 'db4free.net',
        dialect: 'mysql'
    }
);
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
app.post('/', (res, req) => {

    sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
        console.log('// Tables in database', '==========================');
        console.log(tableObj);
    })
        .catch((err) => {
            console.log('showAllSchemas ERROR', err);
        })
    req.send({ text: 'hello' });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
