angular.module("validationMessages.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("validationMessages.html",
    "<span class=\"help-inline\" " +
    "      ng-repeat=\"(key, error) in $field.$error\"" +
    "      ng-show=\"error && $field.$dirty\"" +
    "      bind-validation-message=\"{{key}}\"></span>");
}]);
