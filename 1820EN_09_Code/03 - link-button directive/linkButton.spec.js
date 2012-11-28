describe('linkButton directive', function () {
  var element;
  beforeEach(module('directives.linkButton'));
  beforeEach(inject(function($compile, $rootScope) {
    element = $compile('<link-button type="primary" size="large" href="#link1">Click Me!</link-button>')($rootScope);
  }));

  it('adds a "btn" class to the anchor element', function() {
    expect(element.hasClass('btn')).toBe(true);
  });

  it('adds type and size classes accordingly', function() {
    expect(element.hasClass('btn-primary')).toBe(true);
    expect(element.hasClass('btn-large')).toBe(true);
  });

  it('replaces the link-button element with an anchor element', function() {
    expect(element[0].localName).toBe('a');
  });

  it('leaves the contents of the a intact', function() {
    expect(element.text()).toBe('Click Me!');
    expect(element.attr('href')).toBe('#link1');
  });
});
