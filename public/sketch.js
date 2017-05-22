var rgb = [];
var d = 0;
socket = io();

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);
  }
  background('#fff');
  noStroke();
}

function draw() {
  d = Math.sqrt(rgb.length);
  for(var x = 0; x < d; x++) {
    for(var y = 0; y < d; y++) {
      var index = getIndex(x, y);
      var w = width/d;
      var h = height/d;
      c = color("#" + rgb[index]);
      fill(c);
      rect(x * w, y * h, w, h);
    }
  }
}

function windowResized() {
    if(windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  } else {
    resizeCanvas(windowHeight, windowHeight);
  }
  background(200, 255, 200);
}

socket.on('connected', function (data) {
  rgb = data;
});

function getIndex(x, y) {
  y = y + Math.floor(x/d);
  x = x % d;
  return (x + d * y) % (d * d);
}