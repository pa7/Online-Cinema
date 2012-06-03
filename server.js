var express = require('express');
var Screening = require('./models/screening').Screening;

var app = express.createServer();

// This app's port
var appPort = process.env['app_port'] || 3000;

app.get('/screenings', function(req, res){
  Screening.all(function(err, screenings){
    console.log(screenings);
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
  console.log(req.params);
  res.render('promo', films[req.params.name]);
});

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

app.listen(appPort);
console.log('Server running at port:' + appPort);