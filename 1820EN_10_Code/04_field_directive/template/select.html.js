angular.module("select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("select.html",
    "<div class=\"control-group\" ng-class=\"{'error' : $field.$invalid && $field.$dirty, 'success' : $field.$valid && $field.$dirty}\">" +
    "  <label class=\"control-label\"></label>" +
    "  <div class=\"controls\">" +
    "    <select></select>" +
    "    <span class=\"help-inline\" ng-repeat=\"error in $fieldErrors\">{{$validationMessages[error](this)}}</span>" +
    "  </div>" +
    "</div>");
}]);
