var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// root
router.get('/', (req, res) => {
  res.render('landing');
});

// signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      console.log(error);
      return res.render('signup');
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log(user);
        res.redirect('/campgrounds');
      });
    }
  })
});


// login
router.get('/login', (req, res) => {
  res.render('login')
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => { });

// logout
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/campgrounds');
});

// check login middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;