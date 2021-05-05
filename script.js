const options = document.querySelector('.options');
let createNewEnabled = false;
let showPointsEnabled = true;
let showLinesEnabled = true;
let showCurvesEnabled = true;

let firstAction = false;

displayButtons();


function displayButtons() {
  // remove old buttons
  options.innerHTML = '';

  if (!createNewEnabled)
    addButton('create-new', 'Create new', 'far fa-plus', 'createNew()');
  else
    addButton('done', 'Done', 'far fa-check', 'done()');

  addButton('clear-all', 'Clear all', 'far fa-redo', 'clearAll()');

  if (!showPointsEnabled)
    addButton('show-points', 'Show points', 'far fa-circle', 'toggleShowPoints()');
  else
    addButton('show-points', 'Hide points', 'far fa-circle', 'toggleShowPoints()', true);

  if (!showLinesEnabled)
    addButton('show-lines', 'Show lines', 'far fa-horizontal-rule', 'toggleShowLines()');
  else
    addButton('show-lines', 'Hide lines', 'far fa-horizontal-rule', 'toggleShowLines()', true);

  if (!showCurvesEnabled)
    addButton('show-curves', 'Show curves', 'far fa-wave-sine', 'toggleShowCurves()');
  else
    addButton('show-curves', 'Hide curves', 'far fa-wave-sine', 'toggleShowCurves()', true);  
}

function addButton(id, text, icon, func, checked = false) {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'button-container');
  buttonContainer.setAttribute('id', id);

  const toHide = checked ? '<i class="far fa-slash" style="font-size: 150%"></i>' : '';

  buttonContainer.innerHTML = `
    <button onclick="${func}" style="position: relative">
      <i class="${icon}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>
      ${toHide}
    </button>
    <div class="button-description">
      <p>${text}</p>
    </div>
  `;

  options.appendChild(buttonContainer);
}

function createNew() {
  createNewEnabled = true;
  displayButtons();
  
  let cnv = document.getElementById('canvas');
  cnv.style.cursor = "crosshair";

  if (!firstAction) {
    windowResized();
    firstAction = true;
  }
}

function clearAll() {
  points = [[]];
  current = 0;
  displayButtons();
}

function toggleShowPoints() {
  showPointsEnabled = !showPointsEnabled;
  displayButtons();
}

function toggleShowLines() {
  showLinesEnabled = !showLinesEnabled;
  displayButtons();
}

function toggleShowCurves() {
  showCurvesEnabled = !showCurvesEnabled;
  displayButtons();
}

function done() {
  createNewEnabled = false;
  displayButtons();
  current++;
  points[current] = [];

  let cnv = document.getElementById('canvas');
  cnv.style.cursor = "pointer";
}
