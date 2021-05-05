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
function draw() {
  background('#F3F3F1');
  if (createNewEnabled || current) {
    if (showPointsEnabled) showPoints();
    if (showLinesEnabled) showLines();
    if (showCurvesEnabled) showCurves();
  }
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
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

// Essa função desenha uma linha
function drawLine(x,y,cor){
  stroke(cor);
  strokeWeight(1);
  line(x[0],x[1],y[0],y[1]);
}

// Essa função computa o algoritmo de decasteljau para varios ts e desenha linhas entre eles, depende de deCasteljau para funcionar
function showCurves() {
  var t = 100;
  var bPoints = [];
  for (var k = 0; k < points.length; k++)  {
    if (points[k].length>2) {
      for (var i = 0; i < t; i++) {
        bPoints[i] = deCasteljau(k,i / t);
      }
      for (var i = 0; i < t - 1; i++) {
        drawLine(bPoints[i], bPoints[i + 1], "red");  
      }
    }
  }
}



// Algoritmo de deCasteljau
function deCasteljau(k,t){
  var q = [];
  var n = points[k].length;
  q = points[k].map(point => ({...point}));
  //console.log(q);
  for (var i = 1; i < n; i++) {
    for (var j = 0; j < n - i; j++) {
      q[j].x = (1 - t) * q[j].x + t* q[j + 1].x;
      q[j].y = (1 - t) * q[j].y + t * q[j + 1].y;
    }
  }
  var answ;
  answ = [q[0].x, q[0].y];
  //console.log(answ);
  return answ;
}