// Setup basic express server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app);
var options = {

};
var sslServer = require('https').createServer(options, app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8181;
var sslPort = 8143;
var key = "Put Key Here";
var RateLimit = require('express-rate-limit');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.enable('trust proxy');

var size = 20;
var rgb = [];
var minutes = 1;
var numCalls = 6;

var limiter = new RateLimit({
  windowMs: minutes*60*1000, // 15 minutes
  max: numCalls, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
var limit = app.use('/api/', limiter);

for(var i = 0; i < size*size; i++) {
  rgb.push("ffffff");
}

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

sslServer.listen(sslPort, function () {
  console.log('SSL Server listening at port %d', sslPort);
});

app.post('/admin/colors/:color', function(req, res) {
  if(req.body.key == key) {
    var color = req.params.color;
    for(i in rgb) {
      rgb[i] = color;
    }
    io.sockets.emit('connected', rgb);
    res.send("Colors Set");
  } else {
    res.status(403).send("Forbidden\n");
  }
});

app.post('/admin/size/:length', function(req, res) {
  if(req.body.key == key) {
    var length = req.params.length;
    while(rgb.length != length*length) {
      if(rgb.length > length*length) {
        rgb.pop();
      } else if(rgb.length < length*length) {
        rgb.push("ffffff");
      }
    }
    size = length;
    io.sockets.emit('connected', rgb);
    res.send("Size Changed");
  } else {
    res.status(403).send("Forbidden\n");
  }
});

app.post('/admin/key', function(req, res) {
  if(req.body.key == key) {
    key = req.body.new
    res.send("Key Changed");
  } else {
    res.status(403).send("Forbidden\n");
  }
});

app.put('/api/', function(req, res) {
  var query = req.query;
  var success = 0;
  var error = 0;
  for(i in query) {
    var index = parseInt(i);
    var color = query[i].toUpperCase() + "";
    var isValid = true;
    if(index < 0 || index >= size * size)
      isValid = false;
    if(color.length == 6) {
      for(var j = 0; j < 6; j++) {
        if(color.charCodeAt(j) < 48 || color.charCodeAt(j) > 70 || (color.charCodeAt(j) > 57 && color.charCodeAt(j) < 65))
          isValid = false;
      }
    } else {
      isValid = false;
    }

    if(isValid) {
      rgb[index] = color;
      success++;
    } else {
      error++;
    }
  }
  io.sockets.emit('connected', rgb);
  return res.send(success + " successfull updates. " + error + " errors.\n");
});

app.get('/api/size/', function(req, res) {
  res.json({size: rgb.length});
});

app.get('/api/rate/', function(req, res) {
  res.json({ minutes: minutes, calls: numCalls });
});

app.get('/api/colors/', function(req, res) {
  res.json({squares: rgb});
});

app.get('/api/', function(req, res) {
  res.redirect('https://lminsky.github.io/Paint-By-Numbers/');
});

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  socket.emit('connected', rgb);
});
