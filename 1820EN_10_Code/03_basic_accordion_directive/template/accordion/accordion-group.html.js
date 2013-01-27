angular.module("template/accordion/accordion-group.html", []).run(function($templateCache){
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"accordion-group\">" +
    "  <div class=\"accordion-heading\" ><a class=\"accordion-toggle\" ng-click=\"isOpen = !isOpen\">{{heading}}</a></div>" +
    "  <div class=\"accordion-body\" ng-show=\"isOpen\">" +
    "    <div class=\"accordion-inner\" ng-transclude></div>" +
    "  </div>" +
    "</div>");
});
