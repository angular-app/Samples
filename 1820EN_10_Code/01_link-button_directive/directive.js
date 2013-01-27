angular.module('link-button-directive', [])

.directive('linkButton', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<a ng-transclude></a>',
    compile: function(element, attributes) {
      element.addClass('btn');
      if ( attributes.type ) {
        element.addClass('btn-' + attributes.type);
      }
      if ( attributes.size ) {
        element.addClass('btn-' + attributes.size);
      }
    }
  };
});
