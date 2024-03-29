var Campground = require('../models/campground');
var Comment = require('../models/comment');
var User = require('../models/user');
// middleswares

var middlewares = {
  checkProfileOwner: function(req, res, next) {
    if(req.isAuthenticated()){
      User.findById(req.params.userId, (error, foundUser) => {
        if(error || !foundUser) {
          req.flash('error', 'User does not exist');
          res.redirect('/campgrounds');
        } else {
          if(foundUser._id.equals(req.user._id)) {
            next();
          } else {
            req.flash('error', 'You don\'t have permission to access this page!');
            res.redirect('/campgrounds');
          }
        }
      });
    } else {
      req.flash('error', 'You don\'t have permission to access this page!');
      res.redirect('/campgrounds');
    }
  },
  checkCampOwner: function (req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (error, foundCampground) => {
        if (error || !foundCampground) {
          req.flash('error', 'Campground does not exist');
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