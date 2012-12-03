angular.module('button-directive', [])

.directive('button', function() {
  return {
    restrict: 'E',
    compile: function(element, attributes) {
      element.addClass('btn');
      if ( attributes.type === 'submit' || attributes.type === "primary" ) {
        attributes.$set('type','submit');
        element.addClass('btn-primary');
      } else if ( angular.isDefined(attributes.type) && attributes.type !== 'reset' ) {
        element.addClass('btn-' + attributes.type);
        attributes.$set('type', 'button');
      }
      if ( attributes.size ) {
        element.addClass('btn-' + attributes.size);
      }
    }
  };
});