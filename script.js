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
    addButton('create-new', 'Create new', 'fas fa-plus', 'createNew()', false);
  else
    addButton('done', 'Done', 'fas fa-check', 'done()', false);

  addButton('clear-all', 'Clear all', 'fas fa-redo', 'clearAll()', false);
  addButton('show-points', 'Show points', 'fas fa-circle', 'showPoints()', showPointsEnabled);
  addButton('show-lines', 'Show lines', 'fas fa-grip-lines', 'showLines()', showLinesEnabled);
  addButton('show-curves', 'Show curves', 'fab fa-confluence', 'showCurves()', showCurvesEnabled);
}

function addButton(id, text, icon, func, checked) {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'button-container');
  buttonContainer.setAttribute('id', id);

  const buttonClass = checked ? 'checked' : 'not-checked';

  buttonContainer.innerHTML = `
    <button onclick="${func}" class="${buttonClass}">
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
  displayButtons();
}

function showPoints() {
  showPointsEnabled = !showPointsEnabled;
  displayButtons();
}

function showLines() {
  showLinesEnabled = !showLinesEnabled;
  displayButtons();
}

function showCurves() {
  showCurvesEnabled = !showCurvesEnabled;
  displayButtons();
}

function done() {
  createNewEnabled = false;
  displayButtons();
}
