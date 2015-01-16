//Require Models
var Nerd = require('./models/nerd');

var path = require('path');

/*  ========================================================

            DEFINING ROUTES

// ============================================================ */

module.exports = function (app) {
  // sample api route
    app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function(err, nerds) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)


    // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.send({
            message: "Sorry! It seems you've lost your way. Please check if you typed the right address",
            status: 404
            })); // load our public/index.html file
        });

    };