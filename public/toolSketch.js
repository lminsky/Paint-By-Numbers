var rgb = [];
var d = 0;
var showNumbers = false;

function setup() {
  if(windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } else {
    createCanvas(windowHeight, windowHeight);

  }
  background('#fff');
  var size = parseInt(window.location.search.substring(1)); 
  for(var i = 0; i < size; i++)
    rgb.push(0);
  console.log(size);
}

function draw() {
  d = Math.sqrt(rgb.length);
  for(var x = 0; x < d; x++) {
    for(var y = 0; y < d; y++) {
      var index = getIndex(x, y);
      var w = width/d;
      var h = height/d;
      if(rgb[index] == 0)
        fill(255);
      else
        fill(0);
      rect(x * w, y * h, w, h);
    }
  }
}

function mousePressed() {
  var x = floor(mouseX / (width/d));
  var y = floor(mouseY / (height/d));
  console.log(x + ", " + y);
  rgb[getIndex(x, y)] = (rgb[getIndex(x, y)] + 1) % 2; 
}

function windowResized() {
    if(windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  } else {
    resizeCanvas(windowHeight, windowHeight);
  }
}

function keyPressed() {
  
}

function getIndex(x, y) {
  y = y + Math.floor(x/d);
  x = x % d;
  return (x + d * y) % (d * d);
}