angular.module('app', ['alert-directive'])

.controller('AlertController', function ($scope) {
  $scope.alerts = [
    { type: 'error', msg: 'Oh snap! Something went wrong.' }, 
    { type: 'success', msg: 'Well done! It worked out in the end.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({type: 'warning', msg: "Watch out - another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});