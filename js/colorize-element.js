'use strict';

(function () {
  // set user wizard's coat, eyes, fireball color
  window.colorizeElement = function (element, color, functionType) {
    element.addEventListener('click', function() {
      var randNumber = Math.floor(Math.random() * color.length);
      functionType(element, color[randNumber]);
    });
  };
})();
