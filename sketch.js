function setup(){
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;
  
  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.id('canvas');
  cnv.parent('canvas-container');
}

var points = [];

function displayPoints() {
  stroke('purple');
  strokeWeight(10);

  for (let p of points)
    point(p[0], p[1]);
}

function mouseClicked() {
  points.push([mouseX, mouseY]);
}

function draw(){
  background(120, 143, 160);
  
  if (showPointsEnabled) displayPoints();
}