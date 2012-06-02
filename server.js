var express = require('express');
//var vidStreamer = require("vid-streamer");

var app = express.createServer();

// This app's port
var appPort = process.env['app_port'] || 3000;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'aabdonie98gsdv79sdjsbv2624zihef'}));
  app.use(app.router);
  app.use(express.static(__dirname));
});

//app.get('/films', vidStreamer);

app.listen(appPort);
console.log('Server running at port:' + appPort);