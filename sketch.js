function setup(){
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;
  
  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.id('canvas');
  cnv.parent('canvas-container');
}

var points = [];

function mouseClicked() {
  stroke('purple');
  strokeWeight(10);
  point(mouseX, mouseY);
  points.push([mouseX, mouseY]);
  console.log(points);
  return false;
}

function draw(){
  
}