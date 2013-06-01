angular.module('location_and_include', [])

  .factory('Users', function(){

    var users = [
      {name: 'Pawel'},
      {name: 'Peter'}
    ];

    return {
      query: function() { return users;},
      add : function(user) { return users.push(user);},
      get : function(id) { return users[id];},
      update : function(id, user) { users[id] = user;}
    };
  })

  .controller('NavigationCtrl', function ($scope, $location) {

    var routes = {
      '/admin/users/list': {templateUrl: 'templates/users/list.html'},
      '/admin/users/new': {templateUrl: 'templates/users/new.html'},
      '/admin/users/edit': {templateUrl: 'templates/users/edit.html'}
    };
    var defaultRoute =  routes['/admin/users/list'];

    $scope.$watch(function () {
      return $location.path();
    }, function (newPath) {
      $scope.selectedRoute = routes[newPath] || defaultRoute;
    });
  })

  .controller('ListUsersCtrl', function($scope, Users){
    $scope.users = Users.query();
  })

  .controller('NewUserCtrl', function($scope, Users){
  })

  .controller('EditUserCtrl', function($scope, Users){
  });
