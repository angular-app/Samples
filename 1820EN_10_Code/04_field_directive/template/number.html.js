angular.module("1820EN_10_Code/04_field_directive/template/number.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("1820EN_10_Code/04_field_directive/template/number.html",
    "<div class=\"control-group\" ng-class=\"{'error' : $field.$invalid && $field.$dirty, 'success' : $field.$valid && $field.$dirty}\">" +
    "  <label class=\"control-label\">{{label}}</label>" +
    "  <div class=\"controls\">" +
    "    <input type=\"number\">" +
    "    <span ng-repeat=\"message in $messages\" class=\"help-inline\">{{message.text}}</span>" +
    "  </div>" +
    "</div>");
}]);
