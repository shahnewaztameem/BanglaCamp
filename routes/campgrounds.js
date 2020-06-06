var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// INDEX
router.get('/', (req, res) => {
  // find all campgrounds from db
  Campground.find({}, function (error, campgrounds) {
    if (error) {
      req.flash('error', 'Something went wrong');
      console.log(error);
    } else {
      res.render('campgrounds/index', { campgrounds: campgrounds, page: 'campgrounds' });
    }
  });
});

// post a new campground
router.post('/', middleware.isLoggedIn, (req, res) => {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = { name: name, price: price, image: image, description: description, author: author };
  // create a new camp and save to db
  Campground.create(newCampground, function (error, newlyCreatedCampground) {
    if (error) {
      req.flash('error', 'Something went wrong');
      console.log(error);
    }
    req.flash('success', 'Campground added successfully');
    res.redirect('/campgrounds');
  })

});

// new campground page
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// get camp by id
router.get('/:id', (req, res) => {
  // find camp by id
  Campground.findById(req.params.id).populate('comments').exec(function (error, foundCampground) {
    if (error || !foundCampground) {
      req.flash('error', 'Campground does not exist');
      //console.log(error);
      return res.redirect('/campgrounds');
    }
    //console.log(foundCampground);
    // render show page
    res.render('campgrounds/show', { campground: foundCampground });
  });
});

// edit CAMPGROUND
router.get('/:id/edit', middleware.checkCampOwner, (req, res) => {
  Campground.findById(req.params.id, (error, foundCampground) => {
    if (error) {
      req.flash('error', 'Something went wrong');
      console.log(error);
    }
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});
// update CAMPGROUND
router.put('/:id', middleware.checkCampOwner, (req, res) => {
  // find and update
  Campground.findOneAndUpdate(req.params.id, req.body.campground, (error, updatedCampground) => {
    if (error) {
      req.flash('error', 'Something went wrong');
      res.redirect('/campgrounds');
    } else {
      req.flash('success', 'Campground updated successfully');
      // redirect
      res.redirect('/campgrounds/' + updatedCampground._id);
    }
  });

});

// Destroy
router.delete('/:id', middleware.checkCampOwner, (req, res) => {

  Campground.findByIdAndRemove(req.params.id, (error, removedCampground) => {
    if (error) {
      req.flash('error', 'Something went wrong');
      //console.log(error);
    }
    Comment.deleteMany({ _id: { $in: removedCampground.comments } }, (error) => {
      if (error) {
        console.log(error);
      }
      req.flash('success', 'Campground Deleted successfully');
      res.redirect('/campgrounds');
    })
  });
})





module.exports = router;