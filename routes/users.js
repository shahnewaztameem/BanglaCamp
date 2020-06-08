var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Campground = require('../models/campground');
var middleware = require('../middleware')


// User profile
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId, (error, foundUser) => {
    if (error || !foundUser) {
      req.flash('error', 'User not found!');
      res.redirect('/campgrounds');
    } else {
      Campground.find().where('author.id').equals(foundUser._id).exec(function (error, campgrounds) {
        if (error) {
          req.flash('error', 'Something went wrong!');
          res.redirect('/campgrounds');
        }

        res.render('users/show', { user: foundUser, campgrounds: campgrounds });
      });
    }
    
  });
});

// User profile edit
router.get('/:userId/edit', middleware.checkProfileOwner, (req, res) => {
  User.findById(req.params.userId, (error, foundUser) => {
    if (error || !foundUser) {
      req.flash('error', 'Something went wrong!');
    }
    console.log(foundUser);
    res.render('users/edit', { user: foundUser });
  });
});

router.put('/:userId', middleware.checkProfileOwner, (req, res) => {
  var updatedUser = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profilePicture: req.body.pictureUrl || 'https://www.web-eau.net/images/overrides/avatars/avatar7.png'
  }
  User.findByIdAndUpdate(req.params.userId, updatedUser, (error, updatedUser) => {
    if(error) {
      req.flash('error', 'Error updating user!');
    }
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/users/'+updatedUser._id);
  })
});


module.exports = router;