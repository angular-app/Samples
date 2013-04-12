angular.module('listAndDetails', [])

  .value('users', [
    { name:'Pawel', email:'pawel@domain.com', desc:'Pawel details go here...'},
    { name:'Peter', email:'peter@domain.com', desc:'Peter details go here...' }
  ])

  .controller('ListAndOneDetailCtrl', function ($scope, users) {
    $scope.users = users;

    $scope.selectUser = function (user) {
      $scope.selectedUser = user;
    };

    $scope.isSelected = function (user) {
      return $scope.selectedUser === user;
    };
  })

  .controller('ListAndManyDetailsCtrl', function ($scope, users) {
    $scope.users = users;
  })

  .controller('UserCtrl', function ($scope) {

    $scope.toggleSelected = function () {
      $scope.selected = !$scope.selected;
    };

    $scope.isSelected = function (user) {
      return $scope.selected;
    };
  });
