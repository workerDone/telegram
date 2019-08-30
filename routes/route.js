var express = require('express');
var usersRouter = require('./users');

class IndexRouter extends express.Router {
    constructor(sequelize) {
        super();
        this.post('/', (res, req) => {

            sequelize.getQueryInterface().showAllSchemas()
                .then((tableObj) => {
                    req.send(tableObj);
                })
                .catch((err) => {
                    console.log('showAllSchemas ERROR', err);
                })
        });
        this.use('/users', usersRouter);
    }
}
module.exports = IndexRouter;
