angular.module('directives', [])

.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      numPages: '=',
      currentPage: '=',
      onSelectPage: '&'
    },
    template:
      '<div class="pagination"><ul>' +
        '<li ng-class="{disabled: noPrevious()}"><a ng-click="selectPrevious()">Previous</a></li>' +
        '<li ng-repeat="page in pages" ng-class="{active: isActive(page)}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
        '<li ng-class="{disabled: noNext()}"><a ng-click="selectNext()">Next</a></li>' +
        '</ul>' +
      '</div>',
    replace: true,
    controller: function($scope) {
      $scope.$watch('numPages', function(value) {
        $scope.pages = [];
        for(var i=1;i<=value;i++) {
          $scope.pages.push(i);
        }
      });
      $scope.noPrevious = function() {
        return $scope.currentPage === 1;
      };
      $scope.noNext = function() {
        return $scope.currentPage === $scope.numPages;
      };
      $scope.isActive = function(page) {
        return $scope.currentPage === page;
      };

      $scope.selectPage = function(page) {
        if ( ! $scope.isActive(page) ) {
          $scope.currentPage = page;
          $scope.onSelectPage({ page: page });
        }
      };

      $scope.selectPrevious = function() {
        if ( !$scope.noPrevious() ) {
          $scope.selectPage($scope.currentPage-1);
        }
      };
      $scope.selectNext = function() {
        if ( !$scope.noNext() ) {
          $scope.selectPage($scope.currentPage+1);
        }
      };
    },
    link: function($scope, element, attributes) {
    }
  };
});