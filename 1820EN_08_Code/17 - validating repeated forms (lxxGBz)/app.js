var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.showError = function(ngModelController, error) {
    return ngModelController.$error[error];
  };

  $scope.user = {
    websites: [{url: 'http://www.bloggs.com'}, {url: 'http://www.jo-b.com'}]
  };
  
  $scope.remove = function(index) {
    $scope.user.websites.splice(index, 1);
  };
  
  $scope.add = function() {
    $scope.user.websites.push({ url: ''});
  };
  
});
