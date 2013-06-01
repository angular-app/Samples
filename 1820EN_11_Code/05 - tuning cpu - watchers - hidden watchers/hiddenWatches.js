angular.module('hiddenWatches', [])
  .controller('HiddenWatchesCtrl', function ($scope) {

    $scope.name = 'World';

    $scope.getNameLog = function () {
      console.log('getting name');
      return $scope.name;
    };
  });