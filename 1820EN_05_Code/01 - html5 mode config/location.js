angular.module('location', [], function ($locationProvider) {
  $locationProvider.html5Mode(true);
})

  .controller('MainCtrl', function ($scope, $location) {
    $scope.location = $location;
  });