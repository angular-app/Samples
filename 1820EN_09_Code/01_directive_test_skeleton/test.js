describe('myDir directive', function () {
  var element, scope;

  // Load the directive's module
  beforeEach(module('myDir-module'));

  // Compile the directive and store the element and scope for testing later
  beforeEach(function(){
    inject(function($compile, $rootScope) {
      var linkingFn = $compile('<my-dir></my-dir>');
      scope = $rootScope;
      element = linkingFn(scope);
    });
  });

  it('has some properties', function() {
    expect(element.someMethod()).toBe(XXX);
  });

  it('does something to the scope', function() {
    expect(scope.someField).toBe(XXX);
  });

  it("updates the scope via a $watch", function() {
    scope.someField = 'something';
    scope.$digest();
    expect(scope.someOtherField).toBe('something');
  });
});
