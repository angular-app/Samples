angular.module('if-directive',[])

.directive('if', [function () {
  return {
    transclude: 'element',
    priority: 500,
    compile: function (element, attr, transclude) {
      return function (scope, element, attr) {

        var childElement;
        var childScope;
 
        scope.$watch(attr['if'], function (newValue) {
          
          // Remove the element and scope as we are going to (re)create them now.
          if (childElement) {
            childElement.remove();
            childElement = undefined;
            childScope.$destroy();
            childScope = undefined;
          }

          // If the attribute evaluates to true then we need to clone the transcluded DOM with a new scope
          if (newValue) {
            childScope = scope.$new();
            childElement = transclude(childScope, function(clone) {
              element.after(clone);
            });
          }
        });
      };
    }
  };
}]);