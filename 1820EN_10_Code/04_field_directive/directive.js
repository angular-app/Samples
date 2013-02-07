angular.module('field-directive', ['input.html', 'textarea.html', 'select.html'])

.directive('field', function($compile, $http, $templateCache, $interpolate) {
  
  // Load a template, possibly from the $templateCache, and instantiate a DOM element from it
  function loadTemplate(template) {
    return $http.get(template, {cache:$templateCache}).then(function(response) {
      return angular.element(response.data);
    }, function(response) {
      throw new Error('Template not found: ' + template);
    });
  }

  // Find the "input" element in the template.  It will be one of input, select or textarea.
  // We need to ensure it is wrapped in jqLite\jQuery
  function findInputElement(templateElement) {
    return angular.element(templateElement.find('input')[0] || templateElement.find('select')[0] || templateElement.find('textarea')[0]);
  }

  function findLabelElement(templateElement) {
    return templateElement.find('label');
  }

  // Search through the originalDirective's element for elements that contain information about how to map
  // validation keys to messages
  function getValidationMessageMap(originalElement) {
    // Find all the <validator> child elements and extract their (key, message) info
    var validationMessages = {};
    angular.forEach(originalElement.find('validator'), function(element) {
      // Wrap the element in jqLite/jQuery
      element = angular.element(element);
      // Store the message info to be provided to the scope later
      // The content of the validation element may include interpolation {{}}
      // so we will actually store a function created by the $interpolate service
      // To get the interpolated message we will call this function with the scope. e.g.
      //   var messageString = getMessage(scope);
      validationMessages[element.attr('key')] = $interpolate(element.text());
    });
    return validationMessages;
  }

  // Find the content that will go into the new label
  // Label is provided as a <label> child element of the original element
  function getLabelContent(element) {
    var label = element.find('label');
    return label[0] && label.html();
  }

  return {
    restrict:'E',
    priority: 100,        // We need this directive to happen before ng-model
    terminal: true,       // We are going to deal with this element
    compile: function(element, attrs) {
      if ( attrs.ngRepeat || attrs.ngSwitch || attrs.uiIf ) {
        throw new Error('The ng-repeat, ng-switch and ui-if directives are not supported on the same element as the field directive.');
      }
      if ( !attrs.ngModel ) {
        throw new Error('The ng-model directive must appear on the field element');
      }

      // Extract the label and validation message info from the directive's original element
      var validationMessages = getValidationMessageMap(element);
      var labelContent = getLabelContent(element);

      // Clear the directive's original element now that we have extracted what we need from it
      element.html('');

      return function postLink(scope, element, attrs) {
        // Load up the template for this kind of field, default to the simple input if none given
        loadTemplate(attrs.template || 'input.html').then(function(newElement) {
          // Set up the scope - the template will have its own scope, which is a child of the directive's scope
          var childScope = scope.$new();
          // Attach a copy of the message map to the scope
          childScope.$validationMessages = angular.copy(validationMessages);
          // Generate an id for the field from the ng-model expression and the current scope
          // We replace dots with underscores to work with browsers and ngModel lookup on the FormController
          // We couldn't do this in the compile function as we need to be able to calculate the unique id from the scope
          childScope.$fieldId = attrs.ngModel.replace('.', '_').toLowerCase() + '_' + childScope.$id;
          childScope.$fieldLabel = labelContent;

          // Update the $fieldErrors array when the validity of the field changes
          childScope.$watch('$field.$dirty && $field.$error', function(errorList) {
            childScope.$fieldErrors = [];
            if ( errorList ) {
              angular.forEach(errorList, function(invalid, key) {
                if ( invalid ) {
                  childScope.$fieldErrors.push(key);
                }
              });
            }
          }, true);

          // Update the label's contents
          var labelElement = newElement.find('label');
          labelElement.html(labelContent);

          // Copy over all left over attributes to the input element
          // We can't use interpolation in the template for directives such as ng-model
          var inputElement = findInputElement(newElement);
          angular.forEach(attrs.$attr, function (original, normalized) {
            var value = element.attr(original);
            inputElement.attr(original, value);
          });

          // Wire up the input (id and name) and its label (for).
          // We need to set the input element's name here before we compile the template.
          // If we leave it to be interpolated at the next $digest the formController doesn't pick it up
          inputElement.attr('name', childScope.$fieldId);
          inputElement.attr('id', childScope.$fieldId);
          newElement.find('label').attr('for', childScope.$fieldId);

          // We now compile and link our template here in the postLink function
          // This allows the ng-model directive on our template's <input> element to access the ngFormController
          $compile(newElement)(childScope);

          // Place our template as a child of the original element
          element.append(newElement);

          // Now that our template has been compiled and linked we can access the <input> element's ngModelController
          childScope.$field = inputElement.controller('ngModel');
        });
      };
    }
  };
});