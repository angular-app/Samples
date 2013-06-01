angular.module('internals', [])
  .directive('simpleModel', function ($parse) {
    return function (scope, element, attrs) {

      var modelGetter = $parse(attrs.simpleModel);
      var modelSetter = modelGetter.assign;

      //Model -> DOM updates
      scope.$watch(modelGetter, function(newVal, oldVal){
        element.val(newVal);
      });

      //DOM -> Model updates
      element.bind('input', function () {
        scope.$apply(function () {
          modelSetter(scope, element.val());
        });
      });
    };
  })

  .directive('simpleBind', function ($parse) {
    return function (scope, element, attrs) {

      var modelGetter = $parse(attrs.simpleBind);
      scope.$watch(modelGetter, function(newVal, oldVal){
        element.text(newVal);
      });
    };
  });