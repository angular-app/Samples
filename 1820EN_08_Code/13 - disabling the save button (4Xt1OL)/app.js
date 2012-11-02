var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  // This method is here so that we can display the full JSON of the passed in object
  // The built in json filter removes anythign starting with a $ so you don't get to see the
  // $dirty, $pristine, etc flags
  $scope.toJSON = function(obj) {
    return JSON.stringify(obj, null, 2);
  };
  $scope.canSave = function() {
    return $scope.userInfoForm.$dirty && $scope.userInfoForm.$valid;
  };
});
