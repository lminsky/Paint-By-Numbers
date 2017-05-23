// Setup basic express server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8181;
var key = "Put Key Here";

app.use(bodyParser.urlencoded({
  extended: true
}));

var size = 20;
var rgb = [];

for(var i = 0; i < size*size; i++) {
  rgb.push("ffffff");
}

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.post('/colors/:color', function(req, res) {
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

app.post('/size/:length', function(req, res) {
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

app.put('/', function(req, res) {
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

app.get('/size/', function(req, res) {
  res.send(rgb.length + "\n");
});

app.get('/colors/', function(req, res) {
  var json = "{ \"squares\": [";
  for(var i = 0; i < rgb.length; i++) {
    json += "\"" + rgb[i] + "\"";
    if(i < rgb.length-1) {
      json += ",";
    }
  }
  json += "]}";
  return res.send(json);
});

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
  socket.emit('connected', rgb);
});
