var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  posted_by: String,
  date_created: {type: Date, default: Date.now() },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

mongoose.model('Comment', CommentSchema);

likes: {type: Number, default: 0},