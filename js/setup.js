'use strict';

(function () {
  var NUM_OF_WIZARDS = 4;
  var userDialog = document.querySelector('.setup');
  var setupSubmit = userDialog.querySelector('.setup-submit');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var dataForm = userDialog.querySelector('.setup-wizard-form');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var setupSimilarItem = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardsData = [];

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

  var coatColor = wizardCoatColor[0];
  var eyesColor = wizardEyesColor[0];
  var prevTimeout;

  // return random number of array
  var rand = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  // render wizards and paste rendered wizards in document
  var render = function (data) {
    var items = document.createDocumentFragment();
    for (var i = 0; i < NUM_OF_WIZARDS; i++) {
      var wizardElement = setupSimilarItem.cloneNode(true);
      var name = wizardElement.querySelector('.setup-similar-label');
      var colorCoat = wizardElement.querySelector('.wizard-coat');
      var colorEyes = wizardElement.querySelector('.wizard-eyes');

      name.textContent = data[i].name;
      colorCoat.style.fill = data[i].colorCoat;
      colorEyes.style.fill = data[i].colorEyes;

      items.appendChild(wizardElement);
    };
    setupSimilarList.textContent = '';
    setupSimilarList.appendChild(items);
  };

  // takes data of wizards and
  // sets rank of wizards based on coat, eyes of user wizard
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    };
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    };
    return rank;
  };

  // update similar wizards
  var updateWizards = function () {
    render(wizardsData.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizardsData.indexOf(left) - wizardsData.indexOf(right);
      }
      return rankDiff;
    }));
  };

  // setup user wizard's coat and eyes
  var fillElement = function (element, color) {
    element.style.fill = color;
    if (element.classList.value === 'wizard-coat') {
      coatColor = color;
    } else if (element.classList.value === 'wizard-eyes') {
      eyesColor = color;
    };
    if (prevTimeout) {
      window.clearTimeout(prevTimeout);
    }
    prevTimeout = window.setTimeout(function () {
      updateWizards();
    }, 500);
  };

  // setup user wizard's fireball
  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  // gets data or status from server
  var onLoad = function (data) {
    if (data) {
      wizardsData = data;
      updateWizards();
      setupSimilar.classList.remove('hidden');
    } else {
      userDialog.classList.add('hidden');
    };
  };

  // if the request returned an error ---> shows error message
  var onError = function (errorMessage) {
    console.error(errorMessage);
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.colorizeElement(wizardCoat, wizardCoatColor, fillElement);
  window.colorizeElement(wizardEyes, wizardEyesColor, fillElement);
  window.colorizeElement(wizardFireball, wizardFireballColor, changeElementBackground);

  // loads data from server
  window.backend.load(onLoad, onError);

  // submits data and sends to server
  setupSubmit.addEventListener('click', function (evt) {
    window.backend.save(new FormData(dataForm), onLoad, onError);
    evt.preventDefault();
  });
})();
