describe('bars', function () {

  var Person = function ($log) {
    this.$log = $log;
  };
  Person.prototype.eat = function (food) {
    this.$log.info("Eating delicious "+food);
  };
  Person.prototype.beHungry = function (reason) {
    this.$log.warn("I'm hungry and sad because: "+reason);
  };

  var $q, $exceptionHandler, $log, $rootScope;
  var servePreparedOrder, promisedOrder, me, myFriend;
  beforeEach(inject(function (_$q_, _$exceptionHandler_, _$log_, _$rootScope_) {
    $q = _$q_;
    $exceptionHandler = _$exceptionHandler_;
    $log = _$log_;
    $rootScope = _$rootScope_;
    me = new Person($log);
    myFriend = new Person($log);
  }));

  describe('fast food bar', function () {

    beforeEach(function () {
      servePreparedOrder = $q.defer();
      promisedOrder = servePreparedOrder.promise;
    });

    it('should propagate fulfillment', function () {

      promisedOrder.then(function(sandwich){
        me.eat(sandwich);
      });

      servePreparedOrder.resolve('burger');
      $rootScope.$digest();

      expect($log.info.logs).toContain(['Eating delicious burger']);
    });

    it('should propagate rejection', function () {

      promisedOrder.then(function(sandwich){
        me.eat(sandwich);
      }, function(reason){
        me.beHungry(reason);
      });

      servePreparedOrder.reject('there are no burgers left...');
      $rootScope.$digest();

      expect($log.warn.logs).toContain(['I\'m hungry and sad because: there are no burgers left...']);
    });

    it('should inform all interested parties', function () {

      promisedOrder.then(function(sandwich){
        me.eat(sandwich);
      });
      promisedOrder.then(function(sandwich){
        myFriend.eat(sandwich);
      });

      servePreparedOrder.resolve('formula for two');
      $rootScope.$digest();

      expect($log.info.logs).toContain(['Eating delicious formula for two']);
      expect($log.info.logs.length).toEqual(2);
    });

    it('should resolve chained promises', function () {

      var prepareSandwich = $q.defer();
      var preparedSandwichPromise = prepareSandwich.promise;

      var promisedOrder = preparedSandwichPromise.then(function serveSandwich(sandwich){
        return sandwich;
      }).then(function(sandwich){
        me.eat(sandwich);
      });

      prepareSandwich.resolve('burger just prepared');
      $rootScope.$digest();

      expect($log.info.logs).toContain(['Eating delicious burger just prepared']);
    });


    it('should fail chained promises with the original reason', function () {

      var prepareSandwich = $q.defer();
      var preparedSandwichPromise = prepareSandwich.promise;

      var promisedOrder = preparedSandwichPromise.then(function serveSandwich(sandwich){
        return sandwich;
      }).then(function(sandwich){
          me.eat(sandwich);
        }, function(reason){
          me.beHungry(reason);
        });

      prepareSandwich.reject('there is no chease...');
      $rootScope.$digest();

      expect($log.warn.logs).toContain([ 'I\'m hungry and sad because: there is no chease...' ]);
    });
  });

  describe('fresh made salads bar', function () {

    it('should wait for all the ingredients', function () {

      var servePreparedOrder = $q.defer();
      var promisedOrder = servePreparedOrder.promise;

      var bringTomatoes = $q.defer();
      var bringLettuce = $q.defer();

      promisedOrder.then(function(salad){
        me.eat(salad);
      });

      var ingredientsPromise = $q.all([bringTomatoes.promise, bringLettuce.promise]);
      ingredientsPromise.then(function prepareSalad(ingredients) {
        servePreparedOrder.resolve("Fresh salad with: "+ingredients.join(' and '));
      });

      bringTomatoes.resolve(['red tomatoes', ['green tomatoes']]);
      bringLettuce.resolve('lettuce');

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Eating delicious Fresh salad with: red tomatoes,green tomatoes and lettuce']);
    });

    it('should wait for all the ingredients even if some of them ready', function () {

      var servePreparedOrder = $q.defer();
      var promisedOrder = servePreparedOrder.promise;

      var bringTomatoes = $q.defer();

      promisedOrder.then(function(salad){
        me.eat(salad);
      });

      var ingredientsPromise = $q.all([bringTomatoes.promise, $q.when('lettuce')]);
      ingredientsPromise.then(function prepareSalad(ingredients) {
        servePreparedOrder.resolve("Fresh salad with: "+ingredients.join(' and '));
      });

      bringTomatoes.resolve(['red tomatoes', ['green tomatoes']]);

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Eating delicious Fresh salad with: red tomatoes,green tomatoes and lettuce']);
    });

    it('should fail if one of ingredients is missing', function () {

      var servePreparedOrder = $q.defer();
      var promisedOrder = servePreparedOrder.promise;

      var bringTomatoes = $q.defer();
      var bringLettuce = $q.defer();

      promisedOrder.then(function(salad){
        me.eat(salad);
      }, function(reason) {
        me.beHungry(reason);
      });

      var ingredientsPromise = $q.all([bringTomatoes.promise, bringLettuce.promise]);
      ingredientsPromise.then(function prepareSalad(ingredients) {
        servePreparedOrder.resolve("Fresh salad with: "+ingredients.join(' and '));
      }, function cantPrepare(reason) {
        servePreparedOrder.reject(reason);
      });

      bringTomatoes.resolve(['red tomatoes', ['green tomatoes']]);
      bringLettuce.reject('no fresh lettuce');

      $rootScope.$digest();

      expect($log.warn.logs).toContain(['I\'m hungry and sad because: no fresh lettuce']);
    });
  });

});