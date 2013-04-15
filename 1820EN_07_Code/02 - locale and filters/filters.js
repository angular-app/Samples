angular.module('filters', ['ngLocale'])

  .controller('FiltersCtrl', function ($scope) {

    $scope.now = new Date();

  });