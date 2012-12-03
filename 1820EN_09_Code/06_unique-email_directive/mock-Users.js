// We are best to mock up the whole Users object this way because Users
// relies on so many other services, including the MONGOLAB_CONFIG constant
angular.module('mock.Users', []).factory('Users', function() {
  var Users = { };
  Users.query = function(query, response) {
    // We capture the response so that the tests can call it with their own data
    Users.respondWith = function(emails) {
      response(emails);
      Users.respondWith = undefined;
    };
  };
  return Users;
});

