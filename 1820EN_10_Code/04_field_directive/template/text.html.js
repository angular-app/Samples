angular.module("1820EN_10_Code/04_field_directive/template/text.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("1820EN_10_Code/04_field_directive/template/text.html",
    "<div>" +
    "  <label for=\"{{id}}\">{{label}}</label><input id=\"{{id}}\" name=\"{{name}}\" type=\"text\">" +
    "</div>");
}]);
