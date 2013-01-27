angular.module('date-picker-directive', [])

.directive('datePicker', function () {
  return {
    require:'ngModel',
    link:function (scope, element, attrs, ngModelCtrl) {

      var updateModel = function () {
        scope.$apply(function () {
          var date = element.datepicker("getDate");
          element.datepicker("setDate", element.val());
          ngModelCtrl.$setViewValue(date);
        });
      };

      var onSelectHandler = function(userHandler) {
        if ( userHandler ) {
          // Caller has specified their own onSelect handler
          // so call this as well as updating the model
          return function(value, picker) {
            updateModel();
            return userHandler(value, picker);
          };
        } else {
          return updateModel;
        }
      };

      var setUpDatePicker = function () {
        var options = scope.$eval(attrs.datePicker) || {};
        // Bind to the date picker select event
        options.onSelect = onSelectHandler(options.onSelect);
        // In case the user changes the text directly in the input box
        element.bind('change', updateModel);
        // Remove any previous date picker, to ensure any config changes are picked up
        element.datepicker('destroy');
        // Create the new datepicker widget
        element.datepicker(options);
        // Render will update the date picker with the date
        ngModelCtrl.$render();
      };

      ngModelCtrl.$formatters.push(function(date) {
        if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
          throw new Error(
            'ng-Model value must be a Date object - currently it is a ' + typeof date +
            ' - use ui-date-format to convert it from a string');
        }
        return date;
      });

      ngModelCtrl.$render = function () {
        element.datepicker("setDate", ngModelCtrl.$viewValue);
      };

      // Watch for changes to the directives options
      scope.$watch(attrs.datePicker, setUpDatePicker, true);
    }
  };
});