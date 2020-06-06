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
  res.render('signup', { page: 'signup' });
});

// signup post
router.post('/signup', (req, res) => {
  var newUser = new User({ username: req.body.username });
  if(req.body.adminCode === 'xpiredbrain') {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      //console.log(error);
      return res.render('signup', { errorFlash: error.message });
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log(user);
        req.flash('success', 'Signup Success! Welcome ' + user.username);
        res.redirect('/campgrounds');
      });
    }
  })
});

// login
router.get('/login', (req, res) => {
  res.render('login', { page: 'login' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login',
}), (req, res) => { });

// logout
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Logged you out');
  res.redirect('/campgrounds');
});



module.exports = router;