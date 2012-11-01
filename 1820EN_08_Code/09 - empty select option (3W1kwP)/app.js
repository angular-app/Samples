var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.letters = ['A', 'B', 'C', 'D'];
  $scope.letter = 'E';
  $scope.getType = function(item) {
    if ( angular.isDefined(item) ) {
      if ( item === null ) {
        return 'null';
      }
      return typeof item;
    }
    return 'undefined';
  };
});
