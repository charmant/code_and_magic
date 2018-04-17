(function () {
  var URL_POST = 'https://js.dump.academy/code-and-magick/';
  var URL_GET = URL_POST + 'data';
  var TIMEOUT = 3000; // 3s
  successStatus = 200; // HTTP success status

  window.backend = {

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case successStatus:
            return onLoad(xhr.response);
            break;
          default:
            onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        };
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;
      xhr.open('GET', URL_GET);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case successStatus:
            onLoad(null);
            break;
          default:
            onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        };
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;
      xhr.open('POST', URL_POST);
      xhr.send(data);
    }
  };
})();
