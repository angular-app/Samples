angular.module('httpbasics', [])

  .controller('HttpBasicsCtrl', function ($scope, $http) {

    $scope.getName = function () {

      var futureResponse = $http.get('data.json');
      futureResponse.success(function (data, status, headers, config) {
        $scope.data = data;
      });
      futureResponse.error(function (data, status, headers, config) {
        throw new Error('Something went wrong...');
      });
    };

    $scope.getNameThen = function () {

      var responsePromise = $http.get('data.json');
      responsePromise.then(function (response) {
        $scope.data = response.data;
      },function (response) {
        throw new Error('Something went wrong...');
      });
    };

    $scope.queryUsers = function () {

      $http.get('https://api.mongolab.com/api/1/databases/ascrum/collections/users', {
        params:{
          apiKey:'4fb51e55e4b02e56a67b0b66'
        }
      }).success(function (data, status, headers, config) {
          $scope.users = data;
        }).error(function (data, status, headers, config) {
          throw new Error('Something went wrong...');
        });
    };

    $scope.queryUsersGeneric = function () {

      $http({
        method:'GET',
        url:'https://api.mongolab.com/api/1/databases/ascrum/collections/users',
        params:{
          apiKey:'4fb51e55e4b02e56a67b0b66'
        }
      }).success(function (data, status, headers, config) {
          $scope.usersGeneric = data;
        }).error(function (data, status, headers, config) {
          throw new Error('Something went wrong...');
        });
    };

    $scope.addUser = function (user) {

      var userToAdd = {
        name:'AngularJS Superhero',
        email:'superhero@angularjs.org'
      };

      $http.post('https://api.mongolab.com/api/1/databases/ascrum/collections/users',
        userToAdd, {
          params:{
            apiKey:'4fb51e55e4b02e56a67b0b66'
          }
        }).success(function (data, status, headers, config) {
          $scope.newUser = data;
        }).error(function (data, status, headers, config) {
          throw new Error('Something went wrong...');
        });
    };
  });