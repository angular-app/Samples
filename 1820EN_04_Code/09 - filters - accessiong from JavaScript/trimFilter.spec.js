describe('trim filter', function () {

  var trimFilter;
  beforeEach(module('trimFilter'));
  beforeEach(inject(function (_trimFilter_) {
    trimFilter = _trimFilter_;
  }));


  xit('should trim strings that are too long', function () {
    expect(trimFilter('toooo loooong', 5)).toEqual('to...');
  });

  it('should not trim if within limits', function () {
    expect(trimFilter('ok', 5)).toEqual('ok');
  });
});