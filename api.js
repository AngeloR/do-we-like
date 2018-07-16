'use strict'

const http = require('http');
const toml = require('toml');
const url = require('url');
const fs = require('fs');
const data = fs.readFileSync('./data.toml');
const indexPage = fs.readFileSync('./index.html');

class Api {
    constructor(options) {
        this.port = options.port;
        this.server = http.createServer(this.requestHandler.bind(this));
        this.data = toml.parse(data);
    }

    renderHomepage(req, res) {
        res.statusCode = 200;
        res.write(indexPage);
        res.end();
    }

    requestHandler(req, res) {
        const requestUrl = url.parse(req.url);

        if(requestUrl.pathname.length < 2)
            return this.renderHomepage(req, res);

        const company = decodeURI(requestUrl.pathname.split('/')[1].toLowerCase());
        console.log(company);
        if(!this.data[company]) {
            res.statusCode = 404;
        }
        else {
            const companyData = this.data[company];
            let data = companyData;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            if(companyData.see)
                data = this.data[companyData.see];

            res.write(JSON.stringify(data));
        }
        res.end();
    }

    start(fn) {
        this.server.listen(this.port, () => {
            if(fn)
                fn();
            else
                console.log(`Listening on port ${this.port}`);
        });
    }
}

module.exports = Api;