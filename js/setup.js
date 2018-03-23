var userDialog = document.querySelector('.setup');
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

var rand = function (array) {
  return Math.floor(Math.random() * array.length);
} ;

var wizardСompound = function (nameWizards, lastNameWizards, coatColorWizards, eyesColorWizards, numberWizards) {
  var wizardList = [];
  for (var i = 0; i < numberWizards; i++) {
    wizardList[i] = {
      name: nameWizards[rand(nameWizards)],
      lastName: lastNameWizards[rand(lastNameWizards)],
      coatColor: coatColorWizards[rand(coatColorWizards)],
      eyesColor: eyesColorWizards[rand(eyesColorWizards)]
    };
  };
  return wizardList;
}

var renderWizard = function(wizard) {
  var wizardElement = setupSimilarItem.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

var fragment = function (wizardsArray) {
  var items = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    items.appendChild(renderWizard(wizardsArray[i]));
  };
  return items;
}

var wizards = wizardСompound(wizardName, wizardLastName, wizardCoatColor, wizardEyesColor, numOfWizards);
userDialog.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
setupSimilarList.appendChild(fragment(wizards));
