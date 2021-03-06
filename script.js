const leftOptions = document.querySelector('.left-options');
const rightOptions = document.querySelector('.right-options');

let createNewEnabled = false;
let showPointsEnabled = true;
let showLinesEnabled = true;
let showCurvesEnabled = true;
let addPointsEnabled = false;

let firstButtonActive = true;

let userMadeTheFirstAction = false;
let userCreatedTheFirstCurve = false;




function start() {
  displayButtons();
}

function cursorType(style) {
  let cnv = document.getElementById('canvas');
  cnv.style.cursor = style;
}


// DISPLAY BUTTONS

function displayButtons() {
  let text, icon, func, checked, side;
  
  // remove old buttons
  leftOptions.innerHTML = '';
  rightOptions.innerHTML = '';

  // LEFT SIDE
  side = 'left';

  // CREATE NEW
  if (!createNewEnabled) {
    text = 'Create new';
    icon = 'far fa-plus';
    func = 'createNew()';
  } else {
    text = 'Done';
    icon = 'far fa-check';
    func = 'done()';
  }
  addButton(text, icon, func, side);

  // CLEAR ALL
  text = 'Clear all';
  icon = 'far fa-redo';
  func = 'clearAll()';
  addButton(text, icon, func, side);

  // SHOW POINTS
  icon = 'far fa-circle';
  func = 'toggleShowPoints()';
  if (!showPointsEnabled) {
    text = 'Show points';
    checked = false;
  } else {
    text = 'Hide points';
    checked = true;
  }
  addButton(text, icon, func, side, checked);

  // SHOW LINES
  icon = 'far fa-horizontal-rule';
  func = 'toggleShowLines()';
  if (!showLinesEnabled) {
    text = 'Show lines';
    checked = false;
  } else {
    text = 'Hide lines';
    checked = true;
  }
  addButton(text, icon, func, side, checked);

  // SHOW CURVES
  icon = 'far fa-wave-sine';
  func = 'toggleShowCurves()';
  if (!showCurvesEnabled) {
    text = 'Show curves';
    checked = false;
  } else {
    text = 'Hide curves';
    checked = true;
  }
  addButton(text, icon, func, side, checked);

  // RIGHT SIDE
  side = 'right';

  getInput();

  // SELECT NEXT CURVE
  if (!createNewEnabled && points.length > 2 && !addPointsEnabled) {
    text = 'Select next';
    icon = 'far fa-forward';
    func = 'selectNextCurve()';
    addButton(text, icon, func, side);
  }

  // ADD POINTS
  if (!createNewEnabled && userMadeTheFirstAction && points.length > 1) {
    if (!addPointsEnabled) {
      text = 'Add points';
      icon = 'far fa-plus-circle';
      func = 'addPoints()';
    } else {
      text = 'Done adding';
      icon = 'far fa-check';
      func = 'doneAddingPoints()';
    }
    addButton(text, icon, func, side);
  }

  // DELETE POINT
  if (!createNewEnabled && selectedPoint != null && points[current].length > 3) {
    text = 'Delete point';
    icon = 'far fa-times-circle';
    func = 'deletePoint()';
    addButton(text, icon, func, side);
  }

  // DELETE CURVE
  if (!createNewEnabled && userMadeTheFirstAction && points.length > 1 && !addPointsEnabled) {
    text = 'Delete curve';
    icon = 'far fa-trash';
    func = 'deleteCurve()';
    addButton(text, icon, func, side);
  }
}



// ADD BUTTON

function addButton(text, icon, func, side, checked = false) {
  const buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', 'button-container');

  // BUTTON ID
  if (text === 'Create new' || text === 'Done')
    buttonContainer.setAttribute('id', 'first-button');
  
  if (text === 'Done adding')
    buttonContainer.setAttribute('id', 'done-adding-points');


  // FIRST BUTTON ENABLED OR DISABLED
  if ((text === 'Done' && points[current].length < 2) || ((text === 'Done' || text === 'Create new') && addPointsEnabled))
    firstButtonActive = false;
  else
    firstButtonActive = true;

  let disabledParameter = firstButtonActive ? '' : 'disabled';


  const toHide = checked ? '<i class="far fa-slash"></i>' : '';

  buttonContainer.innerHTML = `
    <button onclick="${func}" class="button-onclick" ${disabledParameter}>
      <i class="${icon} i-icon"></i>
      ${toHide}
    </button>
    <div class="button-description">
      <p>${text}</p>
    </div>
  `;

  if (side === 'left')
    leftOptions.appendChild(buttonContainer);
  else
    rightOptions.appendChild(buttonContainer);
}



// INPUT

function getInput() {
  let evalNumber = document.getElementById('eval-number').value;

  t = evalNumber;

  if (t < 1) {
    document.getElementById('eval-number').value = 100;
    t = 100;
  }
}



// BUTTONS FUNCTIONS

function createNew() {
  createNewEnabled = true;
  selectedPoint = null;
  
  cursorType('crosshair');

  if (!userMadeTheFirstAction)
    userMadeTheFirstAction = true;

  if (userCreatedTheFirstCurve)
    current = points.length - 1;
}

function clearAll() {
  points = [[]];
  current = 0;
  selectedPoint = null;

  createNewEnabled = false;
  showPointsEnabled = true;
  showLinesEnabled = true;
  showCurvesEnabled = true;
  addPointsEnabled = false;

  firstButtonActive = true;

  userCreatedTheFirstCurve = false;
}

function toggleShowPoints() {
  showPointsEnabled = !showPointsEnabled;
}

function toggleShowLines() {
  showLinesEnabled = !showLinesEnabled;
}

function toggleShowCurves() {
  showCurvesEnabled = !showCurvesEnabled;
}

function done() {
  if (userMadeTheFirstAction && points[current].length > 1) {
    createNewEnabled = false;
    points[points.length] = [];

    userCreatedTheFirstCurve = true;
  }
}

function selectNextCurve() {
  current = (current + 1) % (points.length - 1);

  selectedPoint = null;
}

function addPoints() {
  addPointsEnabled = true;
  
  cursorType('crosshair');
}

function doneAddingPoints() {
  addPointsEnabled = false;
}

function deletePoint() {
  let index = points[current].indexOf(selectedPoint);
  points[current].splice(index, 1);

  selectedPoint = null;
}

function deleteCurve() {
  points.splice(current, 1);
  selectNextCurve();
}