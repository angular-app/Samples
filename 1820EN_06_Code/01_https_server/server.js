var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('cert/privatekey.pem').toString();
var certificate = fs.readFileSync('cert/certificate.pem').toString();
var credentials = {key: privateKey, cert: certificate};

var express = require('express');

var app = express();
var secureServer = https.createServer(credentials, app);
var server = http.createServer(app);

// ... Add your routes and middleware here

// Start up the server on the port specified in the config
server.listen(5678);
console.log('Angular App Server - listening on port: 5678');
secureServer.listen(95678);
console.log('Angular App Server - listening on secure port: 95678');
