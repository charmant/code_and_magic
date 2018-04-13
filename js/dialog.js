var dialogHandle = userDialog.querySelector('.setup-user-pic');

dialogHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvent) {
    moveEvent.preventDefault();

    var shift = {
      x: startCoords.x - moveEvent.clientX,
      y: startCoords.y - moveEvent.clientY
    };

    startCoords = {
      x: moveEvent.clientX,
      y: moveEvent.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
