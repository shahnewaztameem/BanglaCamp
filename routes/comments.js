var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// create a new comment
router.post('/', middleware.isLoggedIn, (req, res) => {
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


// Comments update
router.put('/:commentId/edit', middleware.checkCommentOwner, (req, res) => {
  Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (error, update) => {
    if(error) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/'+req.params.id);
    }
  })
});


// comment destroy
router.delete('/:commentId', middleware.checkCommentOwner, (req, res) => {
  // find by id and remove
  Comment.findByIdAndRemove(req.params.commentId, (error) => {
    if(error) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/'+req.params.id);
    }
  })
});



module.exports = router;