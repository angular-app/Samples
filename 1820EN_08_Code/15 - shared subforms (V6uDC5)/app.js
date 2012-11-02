var app = angular.module('myApp', []);

// Here we have two controllers Ctrl1 and Ctrl2, which are the code behind for a couple of forms.
// Both of these forms rely on a common subform, which has a common controller SubFormCtrl

app.controller('MainCtrl', function($scope) {
  $scope.alert = function(form, user) {
    alert(form.$name + ' alert: ' + angular.toJson(user));
  };
  $scope.validMessage= function(form) {
    return form.$valid ? 'Valid' : 'Invalid';
  };
});

app.controller('Ctrl1', function($scope) {
  $scope.user = { name: 'John', age: 50 };
});

app.controller('Ctrl2', function($scope) {
  $scope.user = { name: 'Cathy', sex: 'female' };
});
