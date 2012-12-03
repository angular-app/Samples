describe('button directive', function () {
  var $compile, $rootScope;
  beforeEach(module('button-directive'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('adds a "btn" class to the button element', function() {
    var element = $compile('<button></button>')($rootScope);
    expect(element.hasClass('btn')).toBe(true);
  });

  it('leaves the contents of the button intact', function() {
    var element = $compile('<button>Click Me!</button>')($rootScope);
    expect(element.text()).toBe('Click Me!');
  });

  it('adds size classes correctly', function() {
    var element = $compile('<button size="large"></button>')($rootScope);
    expect(element.hasClass('btn-large')).toBe(true);
  });

  it('adds primary class to submit buttons', function() {
    var element = $compile('<button type="submit"></button>')($rootScope);
    expect(element.hasClass('btn-primary')).toBe(true);
  });

});
