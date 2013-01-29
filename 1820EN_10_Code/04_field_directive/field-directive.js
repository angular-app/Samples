angular.module('field-directive', [
  '1820EN_10_Code/04_field_directive/template/text.html',
  '1820EN_10_Code/04_field_directive/template/textarea.html',
  '1820EN_10_Code/04_field_directive/template/number.html'
])

.directive('field', function($compile, $http, $templateCache, $interpolate) {

  var findInputElement = function(element) {
    return angular.element(element.find('input')[0] || element.find('textarea')[0] || element.find('select')[0]);
  };

  return {
    restrict:'E',
    priority: 100,        // We need this directive to happen before ng-model
    terminal: true,       // We are going to deal with this element
    require: '?^form',    // If we are in a form then we can access the ngModelController
    compile:function compile(originalElement, attrs) {
      var modelId, templatePromise, getFieldElement;

      // Generate an id for the input from the ng-model expression
      // (we need to replace dots with something to work with browsers and also form scope)
      modelId = attrs.ngModel.replace('.', '_').toLowerCase();

      // Load up the template for this kind of field
      getFieldElement = $http.get('1820EN_10_Code/04_field_directive/template/' + attrs.type + '.html', {cache:$templateCache}).then(function(response) {
        var newElement = angular.element(response.data);
        var inputElement = findInputElement(newElement);
        // Copy over the attributes to the input element
        // At least the ng-model attribute must be copied because we can't use interpolation in the template
        angular.forEach(attrs, function (value, key) {
          if ( key.charAt(0) === '$' || key === 'label' || key === 'type' ) {
            return;
          }
          inputElement.attr(attrs.$attr[key], value);
        });
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
          var inputElement = findInputElement(newElement);
          inputElement.attr('name', childScope.name);
          inputElement.attr('id', childScope.id);
          newElement.find('label').attr('for', childScope.id);

          childScope.$validationMessages = {};
          angular.forEach(originalElement.find('validator'), function(validatorElement) {
            validatorElement = angular.element(validatorElement);
            
            // We need to watch the message incase it has interpolated values that need processing
            scope.$watch($interpolate(validatorElement.text()), function (message) {
              childScope.$validationMessages[validatorElement.attr('key')] = message;
            });

            // Extract the options and bind them to the input element            
            var validationAttributes = scope.$eval(validatorElement.attr('options'));
            angular.forEach(validationAttributes, function(value, key) {
              inputElement.attr(key, value);
            });
          });

          // We must compile in the postLink function rather than the compile function
          // otherwise the new input won't pick up the FormController
          $compile(newElement)(childScope, function(clone) {
            // We can only add the new element after the directive element because
            // transclusion caused the directive element to be converted to a template.
            // Comments are ignored by ng-repeat, otherwise this would not work
            element.after(clone);
          });

          // Only after the new element has been compiled will we have access to the $field
          if ( formController ) {
            childScope.$form = formController;
            childScope.$field = formController[childScope.name];
          }

        });
      };
    }
  };
});
