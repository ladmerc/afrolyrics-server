var mongoose = require('mongoose');

//Test mongoose connection
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
  console.log("Connection to database is successful!");
});

//connect to db
mongoose.connect('mongodb://localhost:27017/meanSpa');