describe('field directive', function () {
  var scope, $compile, $httpBackend;
  
  beforeEach(module('field-directive'));
  beforeEach(inject(function ($rootScope, _$compile_, _$httpBackend_) {
    scope = $rootScope;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
  }));

  describe('templates', function() {
    it('loads up a specified template', function() {
      var element = $compile('<field ng-model="x" template="select.html"></field>')(scope);
      scope.$digest();
      expect(element.find('select')[0]).toBeDefined();
    });

    it('loads up a template called "input.html" if none specified', function() {
      var element = $compile('<field ng-model="x"></field>')(scope);
      scope.$digest();
      expect(element.find('input')[0]).toBeDefined();      
    });

    it('handles a missing template', function() {
      $httpBackend.expectGET('notDefined.html').respond(404, []);
      expect(function() {
        var element = $compile('<field ng-model="x" template="notDefined.html"></field>')(scope);
        $httpBackend.flush();
      }).toThrow();
    });

    it('appends the template onto the field element', function() {
      var element = $compile('<field ng-model="x"></field>')(scope);
      scope.$digest();
      expect(element.prop('nodeName')).toBe('FIELD');
      expect(element.find('input')[0]).toBeDefined();
    });

    it('applies name and id to the template\'s input element', function() {
      var element = $compile('<field ng-model="x.y"></field>')(scope);
      scope.$digest();
      var inputElement = element.find('input');
      expect(inputElement.attr('name')).toContain('x_y');
      expect(inputElement.attr('id')).toContain('x_y');
    });

    it('applies a "for" attribute on to the template\'s label element', function() {
      var element = $compile('<field ng-model="x.y"></field>')(scope);
      scope.$digest();
      var labelElement = element.find('label');
      expect(labelElement.attr('for')).toContain('x_y');
    });
  });

  describe('attributes', function() {
    it('copies attributes from the directive to the input/select/textarea element of the template', function() {
      var element = $compile('<field ng-model="x.y" ng-maxlength="3" x-y-z></field>')(scope);
      scope.$digest();
      var inputElement = element.find('input');
      expect(inputElement.attr('ng-maxlength')).toBe('3');
      expect(inputElement.attr('x-y-z')).toBe('');
    });

    it('raises an error if the field element contains ng-repeat, ng-switch or ui-if', function() {
      expect(function() {
        $compile('<field ng-model="x.y" ng-repeat="a in b" x-y-z></field>')(scope);
      }).toThrow();
      expect(function() {
        $compile('<field ng-model="x.y" ng-switch="a" x-y-z></field>')(scope);
      }).toThrow();
      expect(function() {
        $compile('<field ng-model="x.y" ui-if="a" x-y-z></field>')(scope);
      }).toThrow();
    });

    it('copies the label element (child of the directive) contents into the label element (of the template)', function() {
      var element = $compile('<field ng-model="x.y"><label>X<span ng-repeat="x in [0,1]">Y</span>Z</label></field>')(scope);
      scope.$digest();
      var labelElement = element.find('label');
      expect(labelElement.text()).toBe('XYYZ');
    });
  });

  describe('scope', function() {
    it('puts the ngModelController of the input element onto the scope as $field', function() {
      scope.x = 10;
      var element = $compile('<field ng-model="x"></field>')(scope);
      scope.$digest();
      var innerScope = element.find('input').scope();
      expect(innerScope.$field).toBeDefined();
      expect(innerScope.$field.$modelValue).toEqual(10);
    });

    it('adds the ngModelController to an enclosing form', function() {
      var form = $compile('<form name="form"><field ng-model="x"></field></form>')(scope);
      scope.$digest();
      var input = form.find('input');
      expect(form.controller('form')[input.prop('name')]).toBe(input.scope().$field);
    });

    it('updates an array of current error keys as $fieldErrors when the validity of the field changes', function() {
      var element = $compile('<field ng-model="x" ng-maxlength="4" required></field>')(scope);
      scope.$digest();
      var innerScope = element.find('input').scope();
      expect(innerScope.$fieldErrors).toEqual([]);
      innerScope.$field.$setViewValue('xx');
      scope.$digest();
      expect(innerScope.$fieldErrors).toEqual([]);
      innerScope.$field.$setViewValue('');
      scope.$digest();
      expect(innerScope.$fieldErrors).toEqual(['required']);
      innerScope.$field.$setViewValue('xxxxx');
      scope.$digest();
      expect(innerScope.$fieldErrors).toEqual(['maxlength']);
    });

    describe('$validationMessages', function() {
      it('contains all specified validator messages', function() {
        var element = $compile('<field ng-model="x.y"><validator key="x"></validator><validator key="y"></validator></field>')(scope);
        scope.$digest();
        var innerScope = element.find('input').scope();
        expect(innerScope.$validationMessages).toBeDefined();
        expect(innerScope.$validationMessages.x).toEqual(jasmine.any(Function));
        expect(innerScope.$validationMessages.y).toEqual(jasmine.any(Function));
      });
      it('contains interpolation functions', function() {
        var element = $compile('<field ng-model="x.y"><validator key="x">X{{x}}Y</validator><validator key="y">Y{{y}}Z</validator></field>')(scope);
        scope.$digest();
        var innerScope = element.find('input').scope();
        expect(innerScope.$validationMessages.x({x: 10})).toEqual('X10Y');
        expect(innerScope.$validationMessages.y({y: 'xxx'})).toEqual('YxxxZ');
      });
    });
  });
});