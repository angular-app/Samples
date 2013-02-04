angular.module("textarea.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("textarea.html",
    "<div class=\"control-group\" ng-class=\"{'error' : $field.$invalid && $field.$dirty, 'success' : $field.$valid && $field.$dirty}\">" +
    "  <label class=\"control-label\">{{label}}</label>" +
    "  <div class=\"controls\">" +
    "    <textarea></textarea>" +
    "    <span class=\"help-inline\" " +
    "      ng-repeat=\"(key, error) in $field.$error\"" +
    "      ng-show=\"error && $field.$dirty\"" +
    "      bind-validation-message=\"{{key}}\"></span>" +
    "  </div>" +
    "</div>");
}]);
