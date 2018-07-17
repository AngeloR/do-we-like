'use strict';

const toml = require('toml');
const fs = require('fs');
const data = fs.readFileSync('./data.toml');

toml.parse(data);