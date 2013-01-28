angular.module("1820EN_10_Code/03_basic_accordion_directive/template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("1820EN_10_Code/03_basic_accordion_directive/template/accordion/accordion-group.html",
    "<div class=\"accordion-group\">" +
    "  <div class=\"accordion-heading\" ><a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\">{{heading}}</a></div>" +
    "  <div class=\"accordion-body\" ng-show=\"isOpen\">" +
    "    <div class=\"accordion-inner\" ng-transclude></div>" +
    "  </div>" +
    "</div>");
}]);
