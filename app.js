var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds');
});

app.post('/campgrounds', (req,res) => {
  var name = req.body.name;
  var image = req.body.image;
  
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
})

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port '+PORT);
})