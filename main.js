'use strict';

const Api = require('./api');

const api = new Api({
    port: process.env.PORT || 8080
});

api.start();