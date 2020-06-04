var Campground = require('../models/campground')
var Comment = require('../models/comment')
// middleswares

var middlewares = {
  checkCampOwner: function (req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, (error, foundCampground) => {
        if (error) {
          res.redirect('back');
        } else {
          // does the user own the campground
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
  },

  checkCommentOwner: function (req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.commentId, (error, foundComment) => {
        if (error) {
          res.redirect('back');
        } else {
          // does the user own the campground
          if (foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });
    } else {
      res.redirect('back');
    }
  },
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
};


module.exports = middlewares;