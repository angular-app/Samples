var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.myChoice = 3;
  $scope.options = [
    { name: 'one', value: 1},
    { name: 'two', value: 2},
    { name: 'three', value: 3},
    { name: 'four', value: 4}];
});
