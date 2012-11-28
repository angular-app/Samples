describe('button directive', function () {
  beforeEach(module('directives.button'));

  it('adds a "btn" class to the button element', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<button></button>')($rootScope);
      expect(element.hasClass('btn')).toBe(true);
    });
  });

  it('leaves the contents of the button intact', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<button>Click Me!</button>')($rootScope);
      expect(element.text()).toBe('Click Me!');
    });
  });
});
