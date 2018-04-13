'use strict';

window.renderStatistics = function (ctx, names, times) {

  var drawWinCloud = function (x, y, width, height) {

    var stepX = width / 4 - 10;
    var stepY = height / 4 - 10;
    var offset = 20;
    x += offset;

    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.lineTo(x + stepX, y - offset);
    ctx.lineTo(x + stepX * 2, y);
    ctx.lineTo(x + stepX * 3, y - offset);
    ctx.lineTo(x + stepX * 4, y);

    ctx.lineTo(x + stepX * 4 + offset, y + stepY);
    ctx.lineTo(x + stepX * 4, y + stepY * 2);
    ctx.lineTo(x + stepX * 4 + offset, y + stepY * 3);
    ctx.lineTo(x + stepX * 4, y + stepY * 4);

    ctx.lineTo(x + stepX * 3, y + offset + stepY * 4);
    ctx.lineTo(x + stepX * 2, y + stepY * 4);
    ctx.lineTo(x + stepX, y + offset + stepY * 4);
    ctx.lineTo(x, y + stepY * 4);

    ctx.lineTo(x - offset, y + stepY * 3);
    ctx.lineTo(x, y + stepY * 2);
    ctx.lineTo(x - offset, y + stepY);
    ctx.lineTo(x, y);

    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawWinCloud(110, 40, 430, 280);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  drawWinCloud(100, 30, 430, 280);

  var getMaxElement = function (userTime) {
    var maxTime = 0;
    var maxIndex;

    for (var i = 0; i < userTime.length; i++) {
      if (userTime[i] > maxTime) {
        maxTime = userTime[i];
        maxIndex = i;
      }
    }
    return [maxTime, maxIndex];
  };
  var maxTimeIndex = getMaxElement(times);

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 130, 45);
  ctx.fillText('Список результатов:', 130, 65);
  ctx.fillText('Худший игрок - ' + names[maxTimeIndex[1]] + ' (' + Math.round(maxTimeIndex[0]) + ')', 130, 85);

  var barHeight = 150; // px
  var barWidth = 40; // px
  var indent = 50; // px
  var initialX = 155; // px
  var inititalY = 95; // px
  var inititalYText = 265; // px
  var randomOpacity = Math.random();
  for (var i = 0; i < times.length; i++) {

    var barHeightByIndex = Math.round(times[i] * barHeight / maxTimeIndex[0]);
    var inititalYByIndex = barHeight - barHeightByIndex;

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';

    ctx.fillText(names[i], initialX + (barWidth + indent) * i, inititalYText);
    ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
    }

    ctx.fillRect(initialX + (barWidth + indent) * i, inititalY + inititalYByIndex, barWidth, barHeightByIndex);
  }
};
