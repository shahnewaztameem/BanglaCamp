var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var app = express();

mongoose.connect("mongodb://localhost/bangla_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));





app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX
app.get('/campgrounds', (req, res) => {
  // find all campgrounds from db
  Campground.find({}, function(error, campgrounds) {
    if(error) {
      console.log(error);
    } else {
      res.render('index', {campgrounds: campgrounds});
    }
  })
  
});

app.post('/campgrounds', (req,res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
  // create a new camp and save to db
  Campground.create(newCampground, function(error, newlyCreatedCampground) {
    if(error) {
      console.log(error);
    } 
    res.redirect('/campgrounds');
  })
  
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});


app.get('/campgrounds/:id', (req, res) => {
  // find camp by id
  Campground.findById(req.params.id, function(error, foundCampground) {
    if(error) {
      console.log(error);
    }
    res.render('show', {campground: foundCampground});
  })
  // render show page
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port '+PORT);
})