// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 80;

var size = 20;
var rgb = [];

for(var i = 0; i < size*size; i++) {
  rgb.push("ffffff");
}

server.listen(port, function () {
  console.log('Server listening at port %d', port);
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
  return res.send(success + " successfull updates. " + error + " errors.");
});

app.get('/size/', function(req, res) {
  res.send(rgb.length + "");
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
