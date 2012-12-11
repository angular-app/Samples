angular.module('promises', [])
  .controller('PromiseCtrl', function ($scope, $timeout) {

    $scope.name = $timeout(function () {
      return "World";
    }, 2000);

    $scope.getName = function () {
      return $timeout(function () {
        return "World";
      }, 2000);
    };

    $timeout(function () {
      return "World";
    }, 2000).then(function (value) {
        $scope.name = value;
      });
  });