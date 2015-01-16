var mongoose = require('mongoose');

//Test mongoose connection
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
  console.log("Connection to Afrolyrics database is successful!");
});


//connect to db
// if (process.env.NODE_ENV === 'production') {
//   url = 'mongodb://localhost:27017/Afrolyrics';
// };

module.exports = {
  url: 'mongodb://localhost:27017/Afrolyrics'
};
// mongoose.connect('mongodb://localhost:27017/Afrolyrics');
