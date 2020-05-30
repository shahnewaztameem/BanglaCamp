var mongoose = require('mongoose');
// SCHEMA Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});


module.exports = mongoose.model('Campground', campgroundSchema);