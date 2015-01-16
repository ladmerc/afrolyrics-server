/*  ========================================================

           INSTANTIATING APP AND DEPENDENCIES

// ============================================================ */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8000; //define ports

/*  ========================================================

           CONFIGURATION

// ============================================================ */

// app.use(app.router);
app.use(express.static(__dirname + '/public'));

var db = require('./config/db');

var routes = require('./app/routes.js');
routes(app);

//use required files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port, function () {
  console.log("App is listening on port " + port);
})
