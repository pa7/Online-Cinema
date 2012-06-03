var express = require('express');
var Screening = require('./models/screening').Screening;

var app = express.createServer();

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'aabdonie98gsdv79sdjsbv2624zihef'}));
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// This app's port
var appPort = process.env['app_port'] || 3000;

app.get('/screenings', function(req, res){
  Screening.all(function(err, screenings){
    res.render('screenings', {screenings : screenings});
  });
});

app.get('/', function(req, res){
  res.render('index');
});

var films = {
  "tdkr": {
    "name": "The Dark Knight Rises",
    "copyright": "Copyright &copy; 2012 Magnolia Pictures",
    "screenings": [{"startTime": "now"}, {"startTime": "soon"}]
  }
};

app.get('/promo/:name', function(req, res){
  res.render('promo', films[req.params.name]);
});

var screenings = {
  "1337" : {
    "film_id": "tdkr",
    "film": { "description": "wow, so many reasons to watch this movie", "name": "The Dark Knight Rises" },
    "key": "letmein",
    "isPrivate": false,
    "startTime": 9234683,
    "trailer-ids": [
      "f07c069e204d80afcbe3eb390b000b7e",
      "f07c069e204d80afcbe3eb390b001602",
      "f07c069e204d80afcbe3eb390b001fa0",
      "f07c069e204d80afcbe3eb390b00231b"
    ],
    "description": "The awesome description for this screening!"
  }
};

app.get('/screening/:screening_id', function(req, res){
  res.render('screening', screenings[req.params.screening_id]);
});

app.post('/screening/:screening_id/sources', function(req, res){
  if(screenings[req.params.screening_id].key == req.body.key)
    res.send({ sources: { mp4: "/films/BigBuckBunny_640x360.m4v"}});
  else
    res.send(403);
});

app.listen(appPort);
console.log('Server running on port -> ' + appPort);