var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  username: 
  song_title: {type: String, required},
  song_artiste: {type: String, required},
  song_year: Number,
  song_link: String,
  song_art: {type: String, required},
  song_country: String,
  song_lyrics: String,
  average_stars: {type: Number, default 0},
  likes: {type: Number, default: 0},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.methods.likes = function(upvote) {
  this.likes += 1;
  this.save(upvote);
};

PostSchema.methods.stars = function(starRate) {
  this.stars += 1;
  this.save(starRate);
};


//When PostSchema.methods.stars is returned, a middleware should calculate the average