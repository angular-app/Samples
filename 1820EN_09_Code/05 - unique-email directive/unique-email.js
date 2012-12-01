angular.module('directives.unique-email', [])

/**
 * A validation directive to ensure that the model contains a unique email address
 * @param  Users service to provide access to the server's user database
  */
.directive('uniqueEmail', ["Users", function (Users) {
  return {
    require:'ngModel',
    restrict:'A',
    link:function (scope, element, attrs, ngModelCtrl) {
      var original;

      // If the model changes, store this since we assume it is the current value of the user's email
      // and we don't want to check the server if the user re-enters their original email
      ngModelCtrl.$formatters.unshift(function(modelValue) {
        original = modelValue;
        return modelValue;
      });
      
      // using push() here to run it as the last parser, after we are sure that other validators were run
      ngModelCtrl.$parsers.push(function (viewValue) {
        if (viewValue && viewValue !== original ) {
          Users.query({email:viewValue}, function (users) {
            if (users.length === 0) {
              ngModelCtrl.$setValidity('uniqueEmail', true);
            } else {
              ngModelCtrl.$setValidity('uniqueEmail', false);
            }
          });
          return viewValue;
        }
      });
    }
  };
}]);