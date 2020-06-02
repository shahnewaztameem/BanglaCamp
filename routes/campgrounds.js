var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// INDEX
router.get('/', (req, res) => {
  // find all campgrounds from db
  Campground.find({}, function (error, campgrounds) {
    if (error) {
      console.log(error);
    } else {
      res.render('campgrounds/index', { campgrounds: campgrounds, currentUser: req.user });
    }
  });
});

// post a new campground
router.post('/', isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = { name: name, image: image, description: description, author: author };
  // create a new camp and save to db
  Campground.create(newCampground, function (error, newlyCreatedCampground) {
    if (error) {
      console.log(error);
    }
    res.redirect('/campgrounds');
  })

});

// new campground page
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// get camp by id
router.get('/:id', (req, res) => {
  // find camp by id
  Campground.findById(req.params.id).populate('comments').exec(function (error, foundCampground) {
    if (error) {
      console.log(error);
    }
    console.log(foundCampground);
    // render show page
    res.render('campgrounds/show', { campground: foundCampground });
  });
});

// edit CAMPGROUND
router.get('/:id/edit', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (error, foundCampground) => {
    if (error) {
      res.redirect('/campgrounds');
    } else {
      res.render('campgrounds/edit', { campground: foundCampground });
    }
  })

});
// update CAMPGROUND
router.put('/:id',isLoggedIn, (req, res) => {
  // find and update
  Campground.findOneAndUpdate(req.params.id, req.body.campground, (error, updatedCampground) => {
    if(error) {
      res.redirect('/campgrounds');
    } else {
      // redirect
      res.redirect('/campgrounds/'+updatedCampground._id);
    }
  });
 
});

// Destroy
router.delete('/:id', (req, res) => {
  Campground.findByIdAndDelete(req.params.id, (error) => {
    if(error) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
})

// check login middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;