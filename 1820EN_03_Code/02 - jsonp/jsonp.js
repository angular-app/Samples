angular.module('jsonp', [])
  .controller('JSONPCtrl', function ($scope, $http) {

    $scope.jsonpGreet = function () {

      $http
        .jsonp('http://angularjss.org/greet.php?callback=JSON_CALLBACK', {
          params:{
            name:'World'
          }
        })
        .success(function (data) {
          $scope.greeting = data;
        }).error(function(data, status, headers, config){
          throw new Error('Something went wrong...'+status);
        });

    };
  });