var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// create a new comment
router.post('/', middleware.isLoggedIn, (req, res) => {
  // lookup campground by id
  Campground.findById(req.params.id, (error, campground) => {
    if (error) {
      req.flash('error', 'Campground does not exist');
      //console.log(error);
      res.redirect('/campground');
    } else {
      // create a new comment
      Comment.create(req.body.comment, (error, comment) => {
        if (error) {
          req.flash('error', 'Something went wrong');
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
          req.flash('success', 'Comment added successfully');
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
    if (error) {
      req.flash('error', 'Something went wrong');
      res.redirect('back');
    } else {
      req.flash('success', 'Comment updated successfully');
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
});


// comment destroy
router.delete('/:commentId', middleware.checkCommentOwner, (req, res) => {
  // find by id and remove
  Comment.findByIdAndRemove(req.params.commentId, (error) => {
    if (error) {
      req.flash('error', 'Something went wrong!');
      res.redirect('back');
    } else {

      Campground.findByIdAndUpdate(req.params.id, {
        $pull: { comments: req.params.commentId }
      }, function (err, data) {
        if (err) {
          req.flash("error", "Could not DELETE comment!");
          console.log(err);
        } else {
          req.flash("success", "Comment successfully DELETED!");
          res.redirect("/campgrounds/" + req.params.id);
        }
      });



      // req.flash('success', 'Comment deleted successfully');
      // res.redirect('/campgrounds/'+req.params.id);
    }
  })
});



module.exports = router;