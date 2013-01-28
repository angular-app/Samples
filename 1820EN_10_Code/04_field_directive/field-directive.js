angular.module('field-directive', ['1820EN_10_Code/04_field_directive/template/text.html', '1820EN_10_Code/04_field_directive/template/number.html'])

.directive('field', function($compile, $http, $templateCache) {

  return {
    restrict:'E',
    priority: 100,
    transclude: 'element',
    compile:function compile(element, attrs) {
      var modelId, templatePromise, fieldElementPromise;

      // Use the model expression to generate an id for the input
      // (we need to replace dots with something to work with browsers and also form scope)
      modelId = attrs.ngModel.replace('.', '_').toLowerCase();

      fieldElementPromise = $http.get('1820EN_10_Code/04_field_directive/template/' + attrs.type + '.html', {cache:$templateCache}).then(function(response) {
        var newElement = angular.element(response.data);
        newElement.find('input').attr('ng-model', attrs.ngModel);
        return $compile(newElement);
      });

      return function (scope, element, attrs) {
        var childScope = scope.$new();
        childScope.id = childScope.name = modelId + '_' + childScope.$id;
        
        attrs.$observe('label', function(value) {
          childScope.label = value;
        });

        fieldElementPromise.then(function(linker) {
          linker(childScope, function(clone) {
            element.after(clone);
          });
        });
      };
    }
  };
});
