angular.module('expressionsEscaping', ['ngSanitize'])
  .controller('ExpressionsEscapingCtrl', function ($scope, $sanitize) {
    $scope.msg = 'Hello, <b>World</b>!';
    $scope.safeMsg = $sanitize($scope.msg);
  });