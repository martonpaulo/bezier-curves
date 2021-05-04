let points = [[]];
let current = 0;
let t = 100;
let padding = 0;

let sketchWidth = 0;
let sketchHeight = 0;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function resizeCanvasElement() {
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function setup() {
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;

  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.id('canvas');
  cnv.parent('canvas-container');
}

function windowResized() {
  resizeCanvasElement();
}

function mouseClicked() {
  if (mouseX > padding &&
      mouseY > padding &&
      mouseX < sketchWidth - padding &&
      mouseY < sketchHeight - padding )
  {
    if (createNewEnabled)
      points[current].push(new Point(mouseX, mouseY));
  }
}

function draw() {
  background('#F3F3F1');

  if (createNewEnabled || current) {
    if (showPointsEnabled) showPoints();
    if (showLinesEnabled) showLines();
    // if (showLinesEnabled) showCurves();
  }
}

function showPoints() {
  stroke('#EC904C');
  strokeWeight(10);
  for (let i = 0; i < points.length; i++)
    for (let p of points[i])
      point(p.x, p.y);
}

function showLines() {
  stroke('#3D3C3C');
  strokeWeight(2);
  for (let i = 0; i < points.length; i++)
    for (let j = 0; j < points[i].length - 1; j++)
      line(points[i][j].x, points[i][j].y,
          points[i][j + 1].x, points[i][j + 1].y);
}

function showCurves() {
  // let bPoints = [];

  // stroke('#EC904C');
  // strokeWeight(2);
  // for (let i = 0; i < t - 1; i++)
  //   line(bPoints[i][0], bPoints[i][1], bPoints[i + 1][0], bPoints[i + 1][1]);

  // RANDOM COLOR
  // color = color(random(0, 255), random(100, 200), random(0, 100));
}