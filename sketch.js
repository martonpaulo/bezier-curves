function setup() {
  sketchWidth = document.getElementById("canvas-container").offsetWidth;
  sketchHeight = document.getElementById("canvas-container").offsetHeight;

  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.id("canvas");
  cnv.parent("canvas-container");
}

var points = [];
var drawOk = 0;

function displayPoints() {
  stroke('#EC904C');
  strokeWeight(10);

  for (let p of points) point(p[0], p[1]);
}

function mouseClicked() {
  points.push([mouseX, mouseY]);

  for (let p of points) console.log(p[0], p[1]);

  drawOk = 1;
}

function draw() {
  background('#F3F3F1');

  if (showPointsEnabled) displayPoints();

  if (points.length > 1) {
    for (var i = 0; i < points.length - 1; i++) {
      drawLine(points[i], points[i + 1], "black");
    }
    if (points.length > 2) {
      drawCurve();
    }
  }
}

//Desenhar a curva
function drawCurve() {
  var t = 3;
  var bPoints = [];
  for (var i = 0; i < t; i++) {
    bPoints[i] = deCasteljau(points, i / t);
  }
  console.log(bPoints);

  for (var i = 0; i < t - 1; i++) {
    drawLine(bPoints[i], bPoints[i + 1], "red");
  }
}

//Desenha uma linha
function drawLine(p1, p2, color) {
  stroke(color);
  strokeWeight(1);
  line(p1[0], p1[1], p2[0], p2[1]);
}

//Algoritmo deCasteljau
function deCasteljau(points, t) {
  var q = [];
  var n = points.length;
  for (var a = 0; a < n; a++) {
    q[a] = points[a].slice();
  }
  //console.log(q);
  var answ;
  for (var i = 1; i < points.length; i++) {
    for (var j = 0; j < points.length - i; i++) {
      q[j][0] = (1 - t) * q[j][0] + t * q[j + 1][0];
      q[j][1] = (1 - t) * q[j][1] + t * q[j + 1][1];
    }
  }
  answ = [q[0][0], q[0][1]];

  //console.log(answ);
  return answ;
}
