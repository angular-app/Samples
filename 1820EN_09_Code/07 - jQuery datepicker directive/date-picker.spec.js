describe('date-picker directive', function() {
  var $compile, $rootScope;
  var selectDate = function(element, date) {
    element.datepicker('setDate', date);
    $.datepicker._selectDate(element);
  };

  beforeEach(module('directives.date-picker'));
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('simple use on input element', function() {
    it('should be able to get the date from the model', function() {
      var aDate = new Date(2010, 12, 1);
      var element = $compile("<input date-picker ng-model='x'/>")($rootScope);
      $rootScope.x = aDate;
      $rootScope.$digest();
      expect(element.datepicker('getDate')).toEqual(aDate);
    });
    it('should put the date in the model', function() {
      var aDate = new Date(2010, 12, 1);
      var element = $compile("<input date-picker ng-model='x'/>")($rootScope);
      $rootScope.$digest();
      selectDate(element, aDate);
      expect($rootScope.x).toEqual(aDate);
    });
  });
  describe('when model is not a Date object', function() {
    var element;
    beforeEach(function() {
      element = $compile('<input date-picker ng-model="x"/>')($rootScope);
    });
    it('should not set datepicker to null when model is null or undefined', function() {
      $rootScope.x = null;
      $rootScope.$digest();
      expect(element.datepicker('getDate')).toBe(null);
      $rootScope.x = undefined;
      $rootScope.$digest();
      expect(element.datepicker('getDate')).toBe(null);
    });
    it('should throw an error if the model is not a Date object', function() {
      $rootScope.x = false;
      expect(function() { $rootScope.$digest(); }).toThrow();
      $rootScope.x = 0;
      expect(function() { $rootScope.$digest(); }).toThrow();
      $rootScope.x = '';
      expect(function() { $rootScope.$digest(); }).toThrow();
      $rootScope.x = {};
      expect(function() { $rootScope.$digest(); }).toThrow();
    });
  });

  it('should update the input field correctly on a manual update', function() {
    var dateString = '2012-08-17';
    var dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
    var element = $compile('<input date-picker="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
    $rootScope.x = dateObj;
    $rootScope.$digest();
    // Now change the data in the input box
    dateString = '2012-8-01';
    dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
    element.val(dateString);
    element.trigger("change");
    expect(element.datepicker('getDate')).toEqual(dateObj);
    expect(element.val()).toEqual('2012-08-01');
    $rootScope.$digest();
    expect($rootScope.x).toEqual(dateObj);
  });

  describe('when attribute options change', function() {
    it('should watch attribute and update date widget accordingly', function() {
      var element;
      $rootScope.config = {
        minDate: 5
      };
      element = $compile("<input date-picker='config' ng-model='x'/>")($rootScope);
      $rootScope.$digest();
      expect(element.datepicker("option", "minDate")).toBe(5);
      $rootScope.config.minDate = 10;
      $rootScope.$digest();
      expect(element.datepicker("option", "minDate")).toBe(10);
    });
  });

  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      var aDate, element;
      aDate = new Date(2010, 12, 1);
      element = $compile("<input date-picker ng-model='x' ng-required='true' />")($rootScope);
      $rootScope.$digest();
      expect(element.hasClass('ng-invalid')).toBeTruthy();
    });
    it('should be valid if model has been specified', function() {
      var aDate, element;
      aDate = new Date(2010, 12, 1);
      element = $compile("<input date-picker ng-model='x' ng-required='true' />")($rootScope);
      $rootScope.x = aDate;
      $rootScope.$digest();
      expect(element.hasClass('ng-valid')).toBeTruthy();
    });
    it('should be valid after the date has been picked', function() {
      var aDate, element;
      aDate = new Date(2010, 12, 1);
      element = $compile("<input date-picker ng-model='x' ng-required='true' />")($rootScope);
      $rootScope.$digest();
      selectDate(element, aDate);
      expect(element.hasClass('ng-valid')).toBeTruthy();
    });
  });

  describe('on a div element', function() {
    describe('simple use', function() {
      it('should be able to get the date from the model', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x'></div>")($rootScope);
        $rootScope.x = aDate;
        $rootScope.$digest();
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
      it('should put the date in the model', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x'></div>")($rootScope);
        $rootScope.$digest();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
      });
    });
    describe('with ng-required directive', function() {
      it('should be invalid initially', function() {
        var element = $compile("<div date-picker ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$digest();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
      it('should be valid if model has been specified', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.x = aDate;
        $rootScope.$digest();
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
      it('should be valid after the date has been picked', function() {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div date-picker ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$digest();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
});
