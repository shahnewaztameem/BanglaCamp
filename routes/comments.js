var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// create a new comment
router.post('/', isLoggedIn, (req, res) => {
  // lookup campground by id
  Campground.findById(req.params.id, (error, campground) => {
    if (error) {
      console.log(error);
      res.redirect('/campground');
    } else {
      // create a new comment
      Comment.create(req.body.comment, (error, comment) => {
        if (error) {
          console.log(error);
        } else {
          //add username and id
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          // push the comment to the campgroud
          campground.comments.push(comment);
          campground.save();
          //redirect back
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });

});

// check login middleware

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;