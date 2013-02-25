angular.module('filtersPerf', [])

  .filter('logUppercase', function(uppercaseFilter){
    return function(input) {
      console.log('Calling uppercase on: '+input);
      return uppercaseFilter(input);
    };
  });
