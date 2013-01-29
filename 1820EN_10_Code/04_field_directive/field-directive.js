angular.module('field-directive', [
  '1820EN_10_Code/04_field_directive/template/input.html',
  '1820EN_10_Code/04_field_directive/template/textarea.html',
  '1820EN_10_Code/04_field_directive/template/select.html'
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
    compile:function compile(element, attrs) {

      // Find all the <validator> child elements and extract their validation message info
      var validationMessages = [];
      angular.forEach(element.find('validator'), function(validatorElement) {
        validatorElement = angular.element(validatorElement);
        validationMessages.push({
          key: validatorElement.attr('key'),
          getMessage: $interpolate(validatorElement.text())
        });
      });

      // Find the content that will go into the new label
      var labelContent = '';
      if ( element.attr('label') ) {
        labelContent = element.attr('label');
        element[0].removeAttribute('label');
      }
      if ( element.find('label')[0] ) {
        labelContent = element.find('label').html();
      }
      if ( !labelContent ) {
        throw new Error('No label provided');
      }

      // Load up the template for this kind of field
      var template = attrs.template || 'input';   // Default to the simple input if none given
      var getFieldElement = $http.get('1820EN_10_Code/04_field_directive/template/' + template + '.html', {cache:$templateCache}).then(function(response) {
        var newElement = angular.element(response.data);
        var inputElement = findInputElement(newElement);

        // Copy over the attributes to the input element
        // At least the ng-model attribute must be copied because we can't use interpolation in the template
        angular.forEach(element[0].attributes, function (attribute) {
          var value = attribute.value;
          var key = attribute.name;
          inputElement.attr(key, value);
        });

        // Update the label's contents
        var labelElement = newElement.find('label');
        labelElement.html(labelContent);

        return newElement;
      });

      return function (scope, element, attrs, formController) {
        // We have to wait for the field element template to be loaded
        getFieldElement.then(function(newElement) {
          // Our template will have its own child scope
          var childScope = scope.$new();

          // Generate an id for the input from the ng-model expression
          // (we need to replace dots with something to work with browsers and also form scope)
          // (We couldn't do this in the compile function as we need the scope to
          // be able to calculate the unique id)
          childScope.$modelId = attrs.ngModel.replace('.', '_').toLowerCase() + '_' + childScope.$id;

          // Wire up the input (id and name) and its label (for)
          // (We need to set the input element's name here before we compile.
          // If we leave it to interpolation, the formController doesn't pick it up)
          var inputElement = findInputElement(newElement);
          inputElement.attr('name', childScope.$modelId);
          inputElement.attr('id', childScope.$modelId);
          newElement.find('label').attr('for', childScope.$modelId);

          // TODO: Consider moving this validator stuff into its own directive
          // and use a directive controller to wire it all up
          childScope.$validationMessages = {};
          angular.forEach(validationMessages, function(validationMessage) {
            // We need to watch incase it has interpolated values that need processing
            scope.$watch(validationMessage.getMessage, function (message) {
              childScope.$validationMessages[validationMessage.key] = message;
            });
          });

          // We must compile our new element in the postLink function rather than in the compile function
          // (i.e. after any parent form element has been linked)
          // otherwise the new input won't pick up the FormController
          $compile(newElement)(childScope, function(clone) {
            // Place our new element after the original element
            element.after(clone);
            // Remove our original element
            element.remove();
          });

          // Only after the new element has been compiled do we have access to the ngModelController
          // (i.e. formController[childScope.name])
          if ( formController ) {
            childScope.$form = formController;
            childScope.$field = formController[childScope.$modelId];
          }
        });
      };
    }
  };
});
