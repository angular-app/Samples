var TextAreaWithLimitCtrl = function ($scope) {

  var MAX_LEN = 100;
  var MIN_LEN = 1;
  var WARN_THRESHOLD = 10;

  $scope.message = '';

  $scope.remaining = function () {
    return MAX_LEN - $scope.message.length;
  };

  $scope.tooLong = function () {
    return $scope.message.length > MAX_LEN;
  };

  $scope.tooShort = function () {
    return $scope.message.length < MIN_LEN;
  };

  $scope.hasValidLength = function () {
    return !$scope.tooShort() && !$scope.tooLong();
  };

  $scope.shouldWarn = function () {
    return $scope.remaining() < WARN_THRESHOLD;
  };
}
