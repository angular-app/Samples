var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  // This method is here so that we can display the full JSON of the passed in object
  // The built in json filter removes anythign starting with a $ so you don't get to see the
  // $dirty, $pristine, etc flags
  $scope.toJSON = function(obj) {
    return JSON.stringify(obj, null, 2);
  };
  
  $scope.getCssClasses = function(ngModelContoller) {
    return {
      error: ngModelContoller.$invalid && ngModelContoller.$dirty,
      success: ngModelContoller.$valid && ngModelContoller.$dirty
    };
  };
  
  $scope.showError = function(ngModelController, error) {
    return ngModelController.$error[error];
  };
});
