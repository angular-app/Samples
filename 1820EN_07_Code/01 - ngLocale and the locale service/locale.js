angular.module('locale', ['ngLocale'])
  .controller('LocaleCtrl', function ($scope, $locale) {

    $scope.localeid = $locale.id;

    $scope.months = $locale.DATETIME_FORMATS.MONTH;
  });
