/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var xmlparser = require('express-xml-bodyparser');
app.use(bodyParser());
var mysql = require('mysql');
//app.use(xmlparser());
//app.use(express.static( __dirname = "public/"));
//var https = require('https');
var http = require('http').Server(app);
var fs = require('fs');
var port = process.env.PORT || 8686;

app.use(function(err, req, res, next) {

  // error handling logic
 
  res.send(err.stack);

});

require('./app/routes.js')(app);

// https.createServer(options,app, function (req, res) {
// //res.writeHead(200);
// //res.end("Hi from HTTPS");
// }).listen(8686, function () {
// console.log('Express server listening on port ' + port);
// });
app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
