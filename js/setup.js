'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var setupUserWizard = userDialog.querySelector('.setup-wizard');
var setupFireballWrap = userDialog.querySelector('.setup-fireball-wrap');
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var setupSimilarItem = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var numOfWizards = 4;
var wizardName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];

var wizardLastName = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];

var wizardCoatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];

var wizardEyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'];

var wizardFireballColor = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'];

var rand = function (array) {
  return Math.floor(Math.random() * array.length);
};

var wizardСompound = function (nameWizards, lastNameWizards, coatColorWizards, eyesColorWizards, numberWizards) {
  var wizardList = [];
  for (var i = 0; i < numberWizards; i++) {
    wizardList[i] = {
      name: nameWizards[rand(nameWizards)],
      lastName: lastNameWizards[rand(lastNameWizards)],
      coatColor: coatColorWizards[rand(coatColorWizards)],
      eyesColor: eyesColorWizards[rand(eyesColorWizards)]
    };
  }
  return wizardList;
};

var renderWizard = function (wizard) {
  var wizardElement = setupSimilarItem.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = function (wizardsArray) {
  var items = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    items.appendChild(renderWizard(wizardsArray[i]));
  }
  return items;
};

var wizards = wizardСompound(wizardName, wizardLastName, wizardCoatColor, wizardEyesColor, numOfWizards);
setupSimilar.classList.remove('hidden');
setupSimilarList.appendChild(fragment(wizards));

// open and close popup window - wizardSetup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(setupUserName === document.activeElement)) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  userDialog.removeAttribute('style');
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// setup user wizard's coat, eyes, fireball
setupUserWizard.querySelector('.wizard-coat').addEventListener('click', function () {
  setupUserWizard.querySelector('.wizard-coat').style.fill = wizardCoatColor[rand(wizardCoatColor)];
});

setupUserWizard.querySelector('.wizard-eyes').addEventListener('click', function () {
  setupUserWizard.querySelector('.wizard-eyes').style.fill = wizardEyesColor[rand(wizardEyesColor)];
});

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.backgroundColor = wizardFireballColor[rand(wizardFireballColor)];
});


// drag and drop items in user dialog

var shopElement = document.querySelector('.setup-artifacts-shop');
var artifactsElement = document.querySelector('.setup-artifacts');

var draggedItem = null;

shopElement.addEventListener('dragstart', function (evt) {
  console.log(evt);
  if (evt.target.tagName.toLowerCase() === 'img') {
  draggedItem = evt.target;
  evt.dataTransfer.setData('text/plan', evt.target.alt);
  artifactsElement.style.outline = '2px dashed red';
  };
});

shopElement.addEventListener('dragend', function (evt) {
    artifactsElement.removeAttribute('style');
});

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.removeAttribute('style');
  evt.target.appendChild(draggedItem.cloneNode(true));
  evt.preventDefault();
});


artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';

  evt.preventDefault();
});
