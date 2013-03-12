var http = require('http');
var express = require('express');
var xsrf = require('./xsrf');

var app = express();
var server = http.createServer(app);

use(xsrf);

// Start up the server on the port specified in the config
server.listen(5678);
console.log('Angular App Server - listening on port: 5678');
