describe('field directive', function () {
  var scope, $compile, element, $httpBackend;
  
  beforeEach(module('field-directive'));
  beforeEach(inject(function ($rootScope, _$compile_, _$httpBackend_) {
    scope = $rootScope;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
  }));

  describe('templates', function() {
    it('loads up a specified template', function() {
      var element = $compile('<field field-label="X" ng-model="x" template="select.html"></field>')(scope);
      scope.$digest();
      expect(element.find('select')[0]).toBeDefined();
    });

    it('loads up a template called "input.html" if none specified', function() {
      var element = $compile('<field field-label="X" ng-model="x"></field>')(scope);
      scope.$digest();
      expect(element.find('input')[0]).toBeDefined();      
    });

    it('handles a missing template', function() {
      $httpBackend.expectGET('notDefined.html').respond(404, []);
      expect(function() {
        var element = $compile('<field field-label="X" ng-model="x" template="notDefined.html"></field>')(scope);
        $httpBackend.flush();
      }).toThrow();
    });

    it('appends the template onto the field element', function() {
      var element = $compile('<field field-label="X" ng-model="x"></field>')(scope);
      scope.$digest();
      expect(element.prop('nodeName')).toBe('FIELD');
      expect(element.find('input')[0]).toBeDefined();
    });

    it('applies name and id to the template\'s input element', function() {
      var element = $compile('<field field-label="X" ng-model="x.y"></field>')(scope);
      scope.$digest();
      var inputElement = element.find('input');
      expect(inputElement.attr('name')).toContain('x_y');
      expect(inputElement.attr('id')).toContain('x_y');
    });

    it('applies a for attribute to the template\'s label element', function() {
      var element = $compile('<field field-label="X" ng-model="x.y"></field>')(scope);
      scope.$digest();
      var labelElement = element.find('label');
      expect(labelElement.attr('for')).toContain('x_y');
    });
  });
  describe('attributes', function() {
    it('copies attributes from the directive to the input/select/textarea element of the template', function() {
      var element = $compile('<field field-label="X" ng-model="x.y" ng-maxlength="3" x-y-z></field>')(scope);
      scope.$digest();
      var inputElement = element.find('input');
      expect(inputElement.attr('ng-maxlength')).toBe('3');
      expect(inputElement.attr('x-y-z')).toBe('');
    });

    it('raises an error if the field element contains ng-repeat, ng-switch or ui-if', function() {
      expect(function() {
        var element = $compile('<field field-label="X" ng-model="x.y" ng-repeat="a in b" x-y-z></field>')(scope);
      }).toThrow();
      expect(function() {
        var element = $compile('<field field-label="X" ng-model="x.y" ng-switch="a" x-y-z></field>')(scope);
      }).toThrow();
      expect(function() {
        var element = $compile('<field field-label="X" ng-model="x.y" ui-if="a" x-y-z></field>')(scope);
      }).toThrow();
    });

    it('interpolates the field-label attribute into the label element (of the template), if provided', function() {

    });
    it('transcludes the label element (child of the directive) contents into the label element (of the template), if provided', function() {});
    it('errors if neither an attribute nor element provide a label', function() {});
  });
  describe('fieldController', function() {
    it('puts all validator element stuff into fieldController.messageMap', function() {});

  });
  describe('scope', function() {
    it('puts the ngModelController of the input element onto the scope as $field', function() {});
  });
});

describe('validation-messages directive', function() {

});

describe('bind-validation-message directive', function() {

});