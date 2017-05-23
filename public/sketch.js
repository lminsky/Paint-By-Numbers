var rgb = [];
var d = 0;
var showNumbers = false;
socket = io();

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);

  }
  background('#fff');
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
      noStroke();
      rect(x * w, y * h, w, h);
      if(showNumbers) {
        fill(128);
        textSize(12);
        text(index, x * w + 2, y * h + h - 2);
      }
    }
  }
}

function mousePressed() {
  showNumbers = !showNumbers;
}

function windowResized() {
    if(windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  } else {
    resizeCanvas(windowHeight, windowHeight);
  }
}

socket.on('connected', function (data) {
  rgb = data;
});

function getIndex(x, y) {
  y = y + Math.floor(x/d);
  x = x % d;
  return (x + d * y) % (d * d);
}