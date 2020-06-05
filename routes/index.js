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
      req.flash('error', error.message);
      return res.redirect('/signup');
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log(user);
        req.flash('success', 'Welcome ' + user.username);
        res.redirect('/campgrounds');
      });
    }
  })
});

// login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => { });

// logout
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Logged you out');
  res.redirect('/campgrounds');
});



module.exports = router;