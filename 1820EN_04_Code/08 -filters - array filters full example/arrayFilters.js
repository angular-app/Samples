angular.module('arrayFilters', [])

  .controller('ArrayFiltersCtrl', function ($scope) {

    //model
    $scope.backlog = [
      {name:'Submit proposal', desc:'Submit book proposal to PACKT', priority:1, estimation:1, done:true},
      {name:'Prepare outline', desc:'Prepare book outline with estimated page count', priority:2, estimation:2, done:true},
      {name:'Prepare samples', desc:'Think of code samples', priority:3, estimation:5, done:true},
      {name:'Write 1st draft', desc:'Write 1st draft of the text', priority:3, estimation:12, done:false},
      {name:'Review draft', desc:'Re-read and review the 1st draft', priority:4, estimation:5, done:false},
      {name:'Incorporate reviewers remarks', desc:'Go over and reviewers remarks ', priority:6, estimation:3, done:false},
      {name:'Promote in social media', desc:'Promote book in social media!', priority:10, estimation:1, done:false}
    ];

    //filtering
    $scope.filteredBacklog = $scope.backlog;

    //custom filtering function

    $scope.doneAndBigEffort = function (backlogItem) {
      return backlogItem.done && backlogItem.estimation > 20;
    };

    //sorting
    $scope.sortField = undefined;
    $scope.reverse = false;

    $scope.sort = function (fieldName) {
      if ($scope.sortField === fieldName) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.sortField = fieldName;
        $scope.reverse = false;
      }
    };

    $scope.isSortUp = function (fieldName) {
      return $scope.sortField === fieldName && !$scope.reverse;
    };
    $scope.isSortDown = function (fieldName) {
      return $scope.sortField === fieldName && $scope.reverse;
    };

    //pagination
    $scope.pageSize = 3;
    $scope.pages = [];
    $scope.$watch('filteredBacklog.length', function(filteredSize){
      $scope.pages.length = 0;
      var noOfPages = Math.ceil(filteredSize / $scope.pageSize);
      for (var i=0; i<noOfPages; i++) {
        $scope.pages.push(i);
      }
    });

    $scope.setActivePage = function (pageNo) {
      if (pageNo >=0 && pageNo < $scope.pages.length) {
        $scope.pageNo = pageNo;
      }
    };
  })

  .filter('pagination', function(){
     return function(inputArray, selectedPage, pageSize) {
       var start = selectedPage*pageSize;
       return inputArray.slice(start, start + pageSize);
     };
  });