angular.module('highlight', ['ngSanitize'])
  .filter('highlight', function(){
    return function(input, search) {
      if (search) {
        return input.replace(new RegExp(search, 'gi'), '<strong>$&</strong>');
      } else {
        return input;
      }
    };
  });
