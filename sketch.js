function setup(){
  sketchWidth = document.getElementById('canvas-container').offsetWidth;
  sketchHeight = document.getElementById('canvas-container').offsetHeight;
  
  let cnv = createCanvas(sketchWidth, sketchHeight);
  cnv.id('canvas');
  cnv.parent('canvas-container');
}

var points = [];
var drawOk = 0;
function mouseClicked() {
  stroke('purple');
  strokeWeight(10);
  point(mouseX, mouseY);
  points.push([mouseX, mouseY]);
  console.log(points);
  drawOk = 1;
  return false;
}

function draw(){
  background(120,143,160);
  if (drawOk == 1){
    //Desenhar os pontos
    stroke('black');
    strokeWeight(1);
    for (var i = 0; i < points.length-1; i++){
      line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);
    }
    //Desenhar as curvas
    if (points.length>2){
      var t = 3;
      var bPoints = [];
      for (var i = 0; i<t; i++){
        bPoints[i] = deCasteljau(points,i/t);
      }
      for (var i = 0; i<t-1; i++){
        stroke('red');
        strokeWeight(1);
        line(bPoints[i][0],bPoints[i][1],bPoints[i+1][0],bPoints[i+1][1]);
      }
    }
  }

}
//Algoritmo deCasteljau
function deCasteljau(points ,  t){
  var q = points;
  var answ;
  for (var i = 1; i<points.length; i++) {
      for (var j = 0; j < (points.length -i); i++){
          q[j][0] = (1-t)*q[j][0] + t*q[j+1][0];
          q[j][1] = (1-t)*q[j][1] + t*q[j+1][1];
      }
  } 
  answ =[q[0][0], q[0][1]];

  console.log(answ);
  return answ;
}