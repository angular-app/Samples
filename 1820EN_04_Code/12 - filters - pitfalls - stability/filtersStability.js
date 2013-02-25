angular.module('filtersStability', [])
  .filter('random', function (uppercaseFilter) {
    return function randomFilter(inputArray) {
      var idx =  Math.floor(Math.random() * inputArray.length);
      return inputArray[idx];
    };
  })

  .controller('RandomCtrl', function ($scope) {

    $scope.items = new Array(1000);
    for (var i=0; i<$scope.items.length; i++) {
      $scope.items[i] = i;
    }

    $scope.randomValue = Math.floor(Math.random() * $scope.items.length);
  });
