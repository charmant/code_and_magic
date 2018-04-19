'use strict';

(function () {
  // set user wizard's coat, eyes, fireball color
  window.colorizeElement = function (element, color, functionType) {
    var index = 1;
    element.addEventListener('click', function() {
      functionType(element, color[index]);
      index++;
      if (index >= color.length) {
        index = 0;
      };
    });
  };
})();
