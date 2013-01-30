angular.module("alert-directive", [])

.directive('alert', function () {
  return {
    restrict:'EA',
    replace: true,
    template:
    '<div class="alert alert-block alert-{{type || \'info\'}}">' +
      '<button type="button" class="close" ng-click="close()">&times;</button>' +
      '<div ng-transclude></div>' +
    '</div>',
    transclude:true,
    scope:{
      type:'=',
      close:'&'
    }
  };
});
