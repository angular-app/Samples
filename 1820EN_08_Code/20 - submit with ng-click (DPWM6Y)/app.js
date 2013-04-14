var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.showAlert = function(q) {
    alert(q);
  }; 
});
