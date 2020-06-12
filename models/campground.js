var mongoose = require('mongoose');
const Comment = require('./comment');
// SCHEMA Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});


campgroundSchema.pre('remove', async function (next) {
  try {
    await Comment.remove({
      _id: {
        $in: this.comments,
      },
    });
    
  } catch (e) {
    next(e)
  }

});




module.exports = mongoose.model('Campground', campgroundSchema);