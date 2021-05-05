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

function setup() {
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;

  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.id('canvas');
  cnv.parent('canvas-container');
}

function windowResized() {
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

function mouseClicked() {
  
  console.log('Current:', current);
  console.log('Size:', points.length);
  console.log('');

  displayButtons();

  if (
    mouseX > padding &&
    mouseY > padding &&
    mouseX < sketchWidth - padding &&
    mouseY < sketchHeight - padding
  ) {
    if (createNewEnabled || addPointsEnabled)
      points[current].push(new Point(mouseX, mouseY));
  }
}

function draw() {
  background('#F3F3F1');
  if (createNewEnabled || userCreatedTheFirstCurve) {
    if (showPointsEnabled) showPoints();
    if (showLinesEnabled) showLines();
    if (showCurvesEnabled) showCurves();
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
      line(
        points[i][j].x,
        points[i][j].y,
        points[i][j + 1].x,
        points[i][j + 1].y
      );
}

// Essa função desenha uma linha
function drawLine(x, y, color) {
  stroke(color);
  strokeWeight(1.5);
  line(x[0], x[1], y[0], y[1]);
}

// Essa função computa o algoritmo de De Casteljau para vários Ts e desenha linhas entre eles, depende de De Casteljau para funcionar
function showCurves() {
  let t = 2;  
  let bPoints = [];
  let color;

  for (let k = 0; k < points.length; k++) {
    if (points[k].length > 2) {
      if (k == current) color = 'red';
      else color = 'gray'
      //Computando os pontos de controle
      for (let i = 0; i <= t ; i++)
        bPoints[i] = deCasteljau(k, i / t);
      //Desenhando a curva
      for (let i = 0; i < t ; i++)
        drawLine(bPoints[i], bPoints[i + 1], color);
    }
  }
}

// Algoritmo de De Casteljau
function deCasteljau(k, t) {
  let q = [];
  let n = points[k].length;
  let ans;

  q = points[k].map((point) => ({ ...point }));
  
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      q[j].x = (1 - t) * q[j].x + t * q[j + 1].x;
      q[j].y = (1 - t) * q[j].y + t * q[j + 1].y;
    }
  }

  ans = [q[0].x, q[0].y];
  
  return ans;
}
