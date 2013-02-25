angular.module('repeatOverObjectApp', [])

  .controller('RepeatOverObjectCtrl', function ($scope) {

    $scope.dataAsObj = {
      foo : 'foo value',
      bar : 'bar value',
      baz : 'baz value'
    };
  });