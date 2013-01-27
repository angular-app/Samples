angular.module("template/accordion/accordion.html", []).run(function($templateCache){
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"accordion\" ng-transclude></div>");
});
