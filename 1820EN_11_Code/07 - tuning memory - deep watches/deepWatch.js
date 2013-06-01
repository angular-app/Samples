angular.module('deepWatch', [])
  .controller('DeepWatchCtrl', function ($scope) {

    $scope.user = {
      firstName: 'AngularJS',
      lastName: 'Superhero',
      age: 4,
      superpowers: 'unlimited'
    };

    $scope.$watch('user', function (changedUser) {
      $scope.fullName = changedUser.firstName + ' ' + changedUser.lastName;
    }, true);

    $scope.$watch(function(scope) {
      return scope.user.firstName + ' ' + scope.user.lastName;
    }, function (newFullName) {
      $scope.fullName2 = newFullName;
    });

    $scope.fullNameFn = function () {
      return $scope.user.firstName + ' ' + $scope.user.lastName;
    };
  });