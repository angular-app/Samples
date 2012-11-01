var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
  $scope.users = [
    { firstName: 'Jo', lastName: 'Jordan', email: 'jo@jordan.com', sex:"Female"},
    { firstName: 'Anne', lastName: 'Asher', email: 'anne@asher.com', sex:"Female"},
    { firstName: 'Steve', lastName: 'Stone', email: 'steve@stone.com', sex:"Male"},
    { firstName: 'Kev', lastName: 'King', email: 'kev@king.com', sex:"Male"}
    ];
    
    $scope.getFullName = function(user) {
      return user.firstName + ' ' + user.lastName;
    };
});
