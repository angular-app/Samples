var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.alert = function(q) {
    alert(q);
  }; 
});
