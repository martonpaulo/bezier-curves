const options = document.querySelector('.options');
let createNewEnabled = false;
let showPointsEnabled = true;
let showLinesEnabled = true;
let showCurvesEnabled = true;

displayButtons();


function displayButtons() {
  // remove old buttons
  options.innerHTML = '';

  if (!createNewEnabled)
    addButton('create-new', 'Create new', 'fas fa-plus', 'createNew()');
  else
    addButton('done', 'Done', 'fas fa-check', 'done()');

  addButton('clear-all', 'Clear all', 'fas fa-redo', 'clearAll()');

  if (!showPointsEnabled)
    addButton('show-points', 'Show points', 'fas fa-circle', 'toggleShowPoints()');
  else
    addButton('show-points', 'Hide points', 'fas fa-circle', 'toggleShowPoints()');

  if (!showLinesEnabled)
    addButton('show-lines', 'Show lines', 'fas fa-grip-lines', 'toggleShowLines()');
  else
    addButton('show-lines', 'Hide lines', 'fas fa-grip-lines', 'toggleShowLines()');

  if (!showCurvesEnabled)
    addButton('show-curves', 'Show curves', 'fab fa-confluence', 'toggleShowCurves()');
  else
    addButton('show-curves', 'Hide curves', 'fab fa-confluence', 'toggleShowCurves()');  
}

function addButton(id, text, icon, func) {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'button-container');
  buttonContainer.setAttribute('id', id);

  buttonContainer.innerHTML = `
    <button onclick="${func}">
      <i class="${icon}"></i>
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
}
