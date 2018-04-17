'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupSubmit = userDialog.querySelector('.setup-submit');
  var setupClose = userDialog.querySelector('.setup-close');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardEyes = userDialog.querySelector('.wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var dataForm = userDialog.querySelector('.setup-wizard-form');

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

  var renderWizard = function (wizardData) {
    var wizardElement = setupSimilarItem.cloneNode(true);
    var name = wizardElement.querySelector('.setup-similar-label');
    var colorCoat = wizardElement.querySelector('.wizard-coat');
    var colorEyes = wizardElement.querySelector('.wizard-eyes');

    name.textContent = wizardData.name;
    colorCoat.style.fill = wizardData.colorCoat;
    colorEyes.style.fill = wizardData.colorEyes;

    return wizardElement;
  };

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
  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(wizardCoat, wizardCoatColor, fillElement);
  window.colorizeElement(wizardEyes, wizardEyesColor, fillElement);
  window.colorizeElement(wizardFireball, wizardFireballColor, changeElementBackground);

  // get data and status from server
  var onLoad = function (data) {
    if (data) {
      console.log('Successfully got data');
      var items = document.createDocumentFragment();
      for (var i = 0; i < numOfWizards; i++) {
        var wizard = data[rand(data)];
        items.appendChild(renderWizard(wizard));
      };
      setupSimilarList.appendChild(items);
      setupSimilar.classList.remove('hidden');
    } else {
      console.log('Successfully sent data');
      userDialog.classList.add('hidden');
    };
  };

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

  //load data from server
  window.backend.load(onLoad, onError);

  //submit data and send to server
  setupSubmit.addEventListener('click', function (evt) {
    window.backend.save(new FormData(dataForm), onLoad, onError);
    evt.preventDefault();
  });
})();
