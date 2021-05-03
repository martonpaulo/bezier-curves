const options = document.querySelector('.options');
let createNewEnabled = false;

start();


// HTML FUNCTIONS

function start() {
  addButton('create-new', 'Create new', 'fas fa-plus', 'createNew()');
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
  `;

  options.appendChild(buttonContainer);
}

function removeButton(id) {
  const button = document.getElementById(id);
  options.removeChild(button);
}

function createNew() {
  createNewEnabled = true;
  removeButton('create-new');
  addButton('done', 'Done', 'fas fa-check', 'done()');
}

function done() {
  createNewEnabled = false;
  removeButton('done');
  addButton('create-new', 'Create new', 'fas fa-plus', 'createNew()');
}
