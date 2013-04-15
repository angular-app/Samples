angular.module('filterCustomization', [])
  .config(function ($provide) {
    var customFormats = {
      'fr-ca': {
        'fullDate': 'y'
      }
    };

    $provide.decorator('dateFilter', function ($delegate, $locale) {
      return function (input, format) {
        return $delegate(input, customFormats[$locale.id][format] || format);
      };
    });
  })

  .controller('DateCtrl', function ($scope) {
    $scope.now = new Date();
  });