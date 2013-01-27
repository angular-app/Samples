describe('if directive', function () {
  var scope, $compile, element;
  
  beforeEach(module('if-directive'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope;
    $compile = _$compile_;
  }));

  it('does not add element to the DOM if condition is initially false', function () {
    element = $compile('<div><div if="false"></div>')(scope);
    scope.$apply();
    expect(element.children('div').length).toBe(0);
  });

  it('adds the element to the DOM on the first digest if condition is initially true', function () {
    element = $compile('<div><div if="true"></div>')(scope);
    expect(element.children().length).toBe(0);
    scope.$apply();
    expect(element.children().length).toBe(1);
  });

  it('creates or removes the element as the if condition changes', function () {
    element = $compile('<div><div if="someVar"></div></div>')(scope);
    scope.$apply('someVar = true');
    expect(element.children().length).toBe(1);
    scope.$apply('someVar = false');
    expect(element.children().length).toBe(0);
    scope.$apply('someVar = true');
    expect(element.children().length).toBe(1);
  });

  it('creates a new child scope', function () {
    element = $compile('<div><div if="value"><span>{{value}}</span></div></div>')(scope);
    scope.$apply('value = true');
    var span = element.find('span');
    expect(element.children('div').length).toBe(1);
    expect(span.text()).toBe('true');
    span.scope().$apply('value = false');     // Change the value on the child scope
    expect(span.text()).toBe('false');
    expect(element.children('div').length).toBe(1);
  });

  it('does not cause problems between ng-repeats', function () {
    scope.values = [1, 2, 3, 4];
    element = $compile(
      '<div>' +
        '<div ng-repeat="i in values"></div>' +
        '<div if="values.length==4"></div>' +
        '<div ng-repeat="i in values"></div>' +
      '</div>'
    )(scope);
    scope.$apply();
    expect(element.children().length).toBe(9);
    scope.$apply('values.splice(0,1)');
    expect(element.children().length).toBe(6);
    scope.$apply('values.push(1)');
    expect(element.children().length).toBe(9);
  });

  it('has a lower priority than ng-repeat', function () {
    element = $compile(
      '<div>' +
        '<div ng-repeat="i in values" if="$middle">{{i}}</div>' +
      '</div>'
    )(scope);
    scope.$apply('values = [1, 2, 3, 4]');
    expect(element.text()).toBe('23');
    scope.$apply('values.push(5)');
    expect(element.text()).toBe('234');
  });
});