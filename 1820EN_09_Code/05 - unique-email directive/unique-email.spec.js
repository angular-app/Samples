describe('uniqueEmail directive', function() {
  var $scope, testInput, Users;

  beforeEach(module('directives.unique-email'));
  beforeEach(module('mock.Users'));

  beforeEach(inject(function($compile, $rootScope, _Users_){
    Users = _Users_;
    spyOn(Users, 'query').andCallThrough();
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
        '<input name="testInput" ng-model="model.testValue" unique-email>' +
      '</form>'
    );
    $compile(element)($scope);
    $scope.model = {};
    $scope.$digest();
    // Keep a reference to the test input for the tests
    testInput = $scope.form.testInput;
  }));

  it('should be valid initially', function() {
      expect(testInput.$valid).toBe(true);
  });

  it('should not call Users.query when the model changes', function() {
    $scope.model.testValue = 'different';
    $scope.$digest();
    expect(Users.query).not.toHaveBeenCalled();
    expect(testInput.$viewValue).toBe('different');
  });

  it('should call Users.query when the view changes', function() {
    testInput.$setViewValue('different');
    expect(Users.query).toHaveBeenCalled();
  });

  it('should not call Users.query if the view changes to be the same as the original model', function() {
    $scope.model.testValue = 'admin@abc.com';
    $scope.$digest();
    testInput.$setViewValue('admin@abc.com');
    expect(Users.query).not.toHaveBeenCalled();
    testInput.$setViewValue('other@abc.com');
    expect(Users.query).toHaveBeenCalled();
    Users.query.reset();
    testInput.$setViewValue('admin@abc.com');
    expect(Users.query).not.toHaveBeenCalled();
    $scope.model.testValue = 'other@abc.com';
    $scope.$digest();
    testInput.$setViewValue('admin@abc.com');
    expect(Users.query).toHaveBeenCalled();
  });

  it('should set model to invalid if the Users.query response contains users', function() {
    testInput.$setViewValue('different');
    Users.respondWith(['someUser']);
    expect(testInput.$valid).toBe(false);
  });

  it('should set model to valid if the Users.query response contains no users', function() {
    testInput.$setViewValue('different');
    Users.respondWith([]);
    expect(testInput.$valid).toBe(true);
  });
});
