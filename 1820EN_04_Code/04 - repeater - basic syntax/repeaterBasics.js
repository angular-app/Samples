angular.module('repeaterBasics', [])

  .controller('RepeaterBasicsCtrl', function ($scope) {
    $scope.users = [
      { name:'Pawel', email: 'pawel@domain.com' },
      { name:'Peter', email: 'peter@domain.com' }
    ];

    $scope.user = $scope.users[0];
  });