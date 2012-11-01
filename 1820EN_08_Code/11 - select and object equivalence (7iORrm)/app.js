var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.sourceList = [
    {'id': '10005', 'name': "Anne"},
    {'id': '10006', 'name': "Brian"},
    {'id': '10007', 'name': "Charlie"}
  ];

  $scope.selectedItemSimilar = {'id': '10005', 'name': "Anne"};
  $scope.selectedItemExact = $scope.sourceList[0];
});