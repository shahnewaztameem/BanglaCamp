var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var methodOverride = require('method-override');
var app = express();
var seedDB = require('./seeds');

// Routes
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes');

// seedDB();

// DB connects
mongoose.connect("mongodb://localhost/bangla_camp", { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


// passport config
app.use(require('express-session')({
  secret: 'there is no place like 127.0.0.1',
  resave: false,
  saveUninitialized: false
}));

//Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride('_method'));

// send current user data to every page
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds',campgroundRoutes);

// Server startup
var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
})