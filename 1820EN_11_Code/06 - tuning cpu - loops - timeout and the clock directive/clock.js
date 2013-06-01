angular.module('ago', [])

  .controller('ClockCtrl', function ($scope) {

    $scope.evaluatedToo = function () {
      console.log("I'm evaluated too, each second!");
    };

    $scope.$watch(function (newValue, oldValue) {
      console.log('$digest loop in progress...');
    });
  })

  .directive('clockBad', function ($timeout, dateFilter) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {

        function update() {
          var timeNow = new Date();
          element.text(dateFilter(timeNow, 'hh:mm:ss'));
          $timeout(update, 1000);
        }

        update();
      }
    };
  })

  .directive('clockGood', function ($timeout, dateFilter) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {

        function update() {
          var timeNow = new Date();
          element.text(dateFilter(timeNow, 'hh:mm:ss'));
          $timeout(update, 1000, false);
        }

        update();
      }
    };
  });