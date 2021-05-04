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
      console.log(points);
  }
}
var kapa = [[Point]]
  kapa[0].push(new Point(11,22));
  kapa[0].push(new Point(31,2));
  kapa[0].push(new Point(61,62));
function draw() {
  background('#F3F3F1');
  if (createNewEnabled || current) {
    if (showPointsEnabled) showPoints();
    if (showLinesEnabled) showLines();
    if (points[0].length>2){
      if (showLinesEnabled) showCurves();
    }
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
function drawLine(x,y,cor){
  stroke(cor);
  strokeWeight(1);
  line(x[0],x[1],y[0],y[1]);
}
function showCurves() {
  var t = 3;
  var bPoints = [];
  for (var i = 0; i < t; i++) {
    bPoints[i] = deCasteljau(kapa[0], i / t);
  }
  for (var i = 0; i < t - 1; i++) {
    drawLine(bPoints[i], bPoints[i + 1], "red");  
  }
}


//Desenhar a curva



function deCasteljau(a ,  t){
  var q = a;
  for (var i = 1; i < a.length; i++) {
    for (var j = 1; j < a.length - i; i++) {
      q[j].x = (1 - t) * q[j].x + t * q[j + 1].x;
      q[j].y = (1 - t) * q[j].y + t * q[j + 1].y;
    }
  }
  var answ;
  answ = [q[0].x, q[0].y];
  return answ;
}