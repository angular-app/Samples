angular.module('remove', [])

.controller('RemoveCtrl', function ($scope) {

    $scope.name = 'World';

    var watchUnregisterFn = $scope.$watch('name', function (newValue, oldValue) {
      console.log("Watching 'name' variable");
      $scope.watchedName = newValue;
    });

    $scope.unregister = function () {
      watchUnregisterFn();
    };
  });