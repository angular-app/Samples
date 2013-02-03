angular.module('field-directive', ['1820EN_10_Code/04_field_directive/template/text.html', '1820EN_10_Code/04_field_directive/template/number.html'])

.directive('field', function($compile, $http, $templateCache) {

  return {
    restrict:'E',
    priority: 100,        // We need this directive to happen before ng-model
    transclude: 'element',
    require: '?^form',    // If we are in a form then we can access the ngModelController
    compile:function compile(element, attrs, transclude) {
      var modelId, templatePromise, getFieldElement;

      // Generate an id for the input from the ng-model expression
      // (we need to replace dots with something to work with browsers and also form scope)
      modelId = attrs.ngModel.replace('.', '_').toLowerCase();

      // Load up the relevant template
      getFieldElement = $http.get('1820EN_10_Code/04_field_directive/template/' + attrs.type + '.html', {cache:$templateCache}).then(function(response) {
        var newElement = angular.element(response.data);
        var inputElement = newElement.find('input') || newElement.find('textarea') || newElement.find('select');
        // Copy over the ng-model attribute directly because it won't work using interpolation in the template
        inputElement.attr('ng-model', attrs.ngModel);
        return newElement;
      });

      return function (scope, element, attrs, formController) {
        var childScope = scope.$new();
        childScope.id = childScope.name = modelId + '_' + childScope.$id;

        attrs.$observe('label', function(value) {
          // We map the label attribute to the child scope
          childScope.label = value;
        });

        getFieldElement.then(function(newElement) {
          // We need to set the input element's name here before we compile.
          // If we leave it to interpolation, the formController doesn't pick it up
          var inputElement = newElement.find('input') || newElement.find('textarea') || newElement.find('select');
          inputElement.attr('name', childScope.name);
          inputElement.attr('id', childScope.id);
          newElement.find('label').attr('for', childScope.id);

          childScope.$messages = {};
          var originalElement = transclude(scope);
          angular.forEach(originalElement.find('validator'), function(validatorElement) {
            validatorElement = angular.element(validatorElement);
            childScope.$messages[validatorElement.attr('key')] = validatorElement.text();
            var validationAttributes = scope.$eval(validatorElement.attr('attributes'));
            angular.forEach(validationAttributes, function(key, value) {
              inputElement.attr(key, value);
            });
          });

          childScope.$watch('$field.$error', function(errors) {
            childScope.$messages = [];
            angular.forEach(errors, function(key, value) {
              if ( value ) {
                childScope.$messages.push(childScope.$messages[key]);
              }
            });
          }, true);

          // We must compile here otherwise the new input won't pick up the FormController
          $compile(newElement)(childScope, function(clone) {
            // We can only add the new element after the directive element because
            // transclusion caused the directive element to be converted to a template.
            // Comments are ignored by ng-repeat, otherwise this would not work
            element.after(clone);
          });

          if ( formController ) {
            childScope.$form = formController;
            childScope.$field = formController[childScope.name];
          }

        });
      };
    }
  };
});
