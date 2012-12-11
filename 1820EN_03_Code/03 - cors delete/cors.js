angular.module('cors', [])

  .controller('CORSCtrl', function ($scope, $http) {

    $scope.deleteUser = function () {

      var userId = 'userid';

      $http.delete('https://api.mongolab.com/api/1/databases/ascrum/collections/users/' + userId,
        {
          params:{
            apiKey:'4fb51e55e4b02e56a67b0b66'
          }
        }
      );
    };
  });