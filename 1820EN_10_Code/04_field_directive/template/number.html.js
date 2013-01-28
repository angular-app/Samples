angular.module("1820EN_10_Code/04_field_directive/template/number.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("1820EN_10_Code/04_field_directive/template/number.html",
    "<div>" +
    "  <label for=\"{{id}}\">{{label}}</label><input id=\"{{id}}\" name=\"{{name}}\" type=\"number\">" +
    "</div>");
}]);
