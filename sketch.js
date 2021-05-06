let points = [[]];
let current = 0;
let padding = 0;

let t;

let sketchWidth = 0;
let sketchHeight = 0;

let started = false;

let selectedPoint;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.offsetX = 0;
    this.offsetY = 0;
    this.size = 5;
  }

  over() {
    // Is mouse over object    
    if (
      mouseX > this.x - this.size &&
      mouseX < this.x + this.size &&
      mouseY > this.y - this.size &&
      mouseY < this.y + this.size
    ) {
      this.rollover = true;

      if (!createNewEnabled)
        cursorType('pointer');

    } else {
      this.rollover = false;

      if (!createNewEnabled)
        cursorType('default');
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  pressed() {
    // Did I click on the rectangle?
    if (
      mouseX > this.x - this.size &&
      mouseX < this.x + this.size &&
      mouseY > this.y - this.size &&
      mouseY < this.y + this.size
    ) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
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

function keyPressed() {
  if (keyCode === 13)
    getInput();
}

function mouseClicked() {
  displayButtons();

  if (
    mouseX > padding &&
    mouseY > padding &&
    mouseX < sketchWidth - padding &&
    mouseY < sketchHeight - padding
  ) {
    if (createNewEnabled || addPointsEnabled) {
      let p = new Point(mouseX, mouseY);
      points[current].push(p);
      selectedPoint = p;
    }
  }
}

function draw() {
  background('#F3F3F1');
  if (createNewEnabled || userCreatedTheFirstCurve) {
    if (showPointsEnabled) showPoints();
    if (showLinesEnabled) showLines();
    if (showCurvesEnabled) showCurves();
  }

  if (!started) {
    windowResized();
    started = true;
  }
}

function showPoints() {
  strokeWeight(10);

  for (let i = 0; i < points.length; i++) {
    for (let p of points[i]) {

      if (p.dragging || p == selectedPoint) {
        stroke('black');
        selectedPoint = p;

      } else {
        stroke('#EC904C');
      }

      point(p.x, p.y);
      p.update();

      if (i == current)
        p.over();
    }
  }
}

function mousePressed() {
  if (!createNewEnabled && points.length > 1)
    for (let p of points[current])
      p.pressed();
}

function mouseReleased() {
  if (!createNewEnabled && points.length > 1)
    for (let p of points[current])
      p.released();
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
  let bPoints = [];
  let color;

  for (let k = 0; k < points.length; k++) {
    if (points[k].length > 2) {
      if (k === current) color = 'red';
      else color = '#666666'
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
