angular.module('i18nmessages', [])
  .value('i18nmessages', {
    'greetings.hello': 'Hello'
  });

angular.module('i18nfilter', ['i18nmessages'])
  .filter('i18n', function (i18nmessages) {
    return function (input) {
      if (!angular.isString(input)) {
        return input;
      }
      return i18nmessages[input] || '?'+input+'?';
    };
  });
