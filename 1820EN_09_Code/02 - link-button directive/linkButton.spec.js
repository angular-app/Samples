describe('button directive', function () {
  beforeEach(module('directives.linkButton'));

  it('replaces the link-button element with an anchor element', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<link-button></link-button>')($rootScope);
      expect(element[0].localName).toBe('a');
    });
  });

  it('adds a "btn" class to the anchor element', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<link-button></link-button>')($rootScope);
      expect(element.hasClass('btn')).toBe(true);
    });
  });

  it('leaves the contents of the a intact', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<link-button href="#link1">Click Me!</link-button>')($rootScope);
      expect(element.text()).toBe('Click Me!');
      expect(element.attr('href')).toBe('#link1');
    });
  });

  it('adds type and size classes accordingly', function() {
    inject(function($compile, $rootScope) {
      var element = $compile('<link-button type="primary" size="large">Click Me!</link-button>')($rootScope);
      expect(element.hasClass('btn-primary')).toBe(true);
      expect(element.hasClass('btn-large')).toBe(true);
    });
  });
});
