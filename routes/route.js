var express = require('express');
var indexRouter = require('./index');
var usersRouter = require('./users');

class IndexRouter extends express.Router {
    constructor(sequelize) {
        super();
        this.post('/', (req, res) => {

            sequelize.getQueryInterface().showAllSchemas()
                .then((tableObj) => {
                    req.send(tableObj);
                })
                .catch((err) => {
                    console.log('showAllSchemas ERROR', err);
                })
        });

        this.use('/', indexRouter);
        this.use('/users', usersRouter);
    }
}
module.exports = IndexRouter;
