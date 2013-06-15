angular.module('app', ['engines'])

  .controller('AppCtrl', function ($scope, car) {
    car.start();
  })

  .factory('car', function ($log, dieselEngine) {
    return {
      start: function() {
        $log.info('Starting ' + dieselEngine.type)
      }
    }
  });

angular.module('engines', [])
  .factory('dieselEngine', function () {
    return {
      type: 'diesel'
    }
  });




