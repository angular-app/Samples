angular.module('directives.button', [])

.directive('button', function() {
  return {
    restrict: 'E',
    compile: function(element) {
      element.addClass('btn');
    }
  };
});