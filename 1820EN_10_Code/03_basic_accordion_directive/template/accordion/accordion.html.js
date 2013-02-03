angular.module("accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("accordion.html",
    "<div class=\"accordion\" ng-transclude></div>");
}]);
