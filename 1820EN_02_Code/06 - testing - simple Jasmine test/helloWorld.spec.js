describe('hello World test', function () {

  var greeter;
  beforeEach(function () {
    greeter = new Greeter();
  });

  it('should say hello to the World', function () {
    expect(greeter.say('World')).toEqual('Hello, World!');
  });
});