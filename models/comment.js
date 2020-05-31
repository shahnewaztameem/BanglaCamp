var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  comment: String,
  author: String
});

module.exports = mongoose.model('Comment', commentSchema);