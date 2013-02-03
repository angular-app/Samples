describe('field directive', function () {
  var scope, $compile, element;
  
  beforeEach(module('field-directive'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope;
    $compile = _$compile_;
  }));

  describe('templates', function() {
    it('loads up a specified template', function() {});
    it('loads up a template called "input" if none specified', function() {});
    it('handles a missing template', function() {});
  });
  describe('attributes', function() {
    it('copies attributes from the directive to the input/select/textarea element of the template', function() {});
    it('interpolates the label attribute into the label element (of the template), if provided', function() {});
    it('transcludes the label element (child of the directive) contents into the label element (of the template), if provided', function() {});
    it('errors if neither an attribute nor element provide a label', function() {});
  });

});