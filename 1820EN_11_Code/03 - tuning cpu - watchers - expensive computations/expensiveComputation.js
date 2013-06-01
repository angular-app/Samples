angular.module('expensiveComputation', [])
  .controller('ExpensiveComputationCtrl', function ($scope) {
    $scope.name = 'World';

    $scope.myComplexComputation = function () {
      console.log('computing');
      return $scope.name;
    };


    $scope.getName = function () {
      return $scope.name;
    };
    $scope.getNameLog = function () {
      console.log('getting name');
      return $scope.name;
    };
  })

  .filter('myComplexFilter', function () {
    return function (input) {
      console.log('filtering');
      return input;
    };
  });
