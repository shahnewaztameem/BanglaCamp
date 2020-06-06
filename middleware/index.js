var Campground = require('../models/campground')
var Comment = require('../models/comment')
// middleswares

var middlewares = {
  checkCampOwner: function (req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (error, foundCampground) => {
        if (error || !foundCampground) {
          req.flash('error', 'Campgroun does not exits');
          res.redirect('/campgrounds');
        } else {
          // does the user own the campground
          if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
            next();
          } else {
            req.flash('error', 'You don\'t have the permission to do that');
            res.redirect('/campgrounds');
          }
        }
      });
    } else {
      req.flash('error', 'You don\'t have the permission to do that');
      res.redirect('/campgrounds');
    }
  },

  checkCommentOwner: function (req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.commentId, (error, foundComment) => {
        if (error || !foundComment) {
          req.flash('error', 'Comment not found');
          res.redirect('back');
        } else {
          // does the user own the campground
          if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
            next();
          } else {
            req.flash('error', 'You don\'t have permission to do that!');
            res.redirect('back');
          }
        }
      });
    } else {
      // if not logged in
      req.flash('error', 'You need to be logged in to do that!');
      res.redirect('back');
    }
  },
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('errorFlash', 'You need to be login to perform this action!');
    res.redirect('/login');
  }
};


module.exports = middlewares;