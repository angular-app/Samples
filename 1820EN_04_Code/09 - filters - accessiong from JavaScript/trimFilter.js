angular.module('trimFilter', [])
  .filter('trim', function($filter){

    var limitToFilter =  $filter('limitTo');

    return function(input, limit) {
      if (input.length > limit) {
        return limitToFilter(input, limit-3) + '...';
      }
      return input;
    };
  })

  .filter('trim2', function(limitToFilter){
    return function(input, limit) {
      if (input.length > limit) {
        return limitToFilter(input, limit-3) + '...';
      }
      return input;
    };
  });