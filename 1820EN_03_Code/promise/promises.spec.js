function createCustomer(name, $log) {
  return {
    eat: function (food) {
      $log.info(name + " is eating delicious "+food);
    },
    beHungry: function (reason) {
      $log.warn(name + " is hungry and sad because: "+reason);
    }
  };
};

function createPizzaCompany($log, $q) {
  var currentOrder;
  return {
    orderMargherita: function() {
      currentOrder = $q.defer();
      return currentOrder.promise;
    },
    deliverMargherita: function() {
      currentOrder.resolve('Margherita Pizza');
    },
    outOfMargheritas: function() {
      currentOrder.reject('there are no Margherita pizzas left');
    }
  };
};

describe('Promises', function () {

  var $q, $log, $rootScope;
  beforeEach(inject(function (_$q_, _$log_, _$rootScope_) {
    $q = _$q_;
    $log = _$log_;
    $rootScope = _$rootScope_;
  }));


  describe('Ordering a Margherita Pizza', function () {
  
    var promisedOrder, pawel, pete, pizzaCompany;
    beforeEach(function() {
      pawel = createCustomer('Pawel', $log);
      pete = createCustomer('Pete', $log);
      pizzaCompany = createPizzaCompany($log, $q);
      promisedOrder = pizzaCompany.orderMargherita();
    });

    it('should get a promised pizza if they deliver it', function () {

      promisedOrder.then(pawel.eat);

      pizzaCompany.deliverMargherita();

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Pawel is eating delicious Margherita Pizza']);
    });

    it('should get an apology if they are out of stock', function () {

      promisedOrder.then(pawel.eat, pawel.beHungry);

      pizzaCompany.outOfMargheritas();

      $rootScope.$digest();

      expect($log.warn.logs).toContain(['Pawel is hungry and sad because: there are no Margherita pizzas left']);
    });

    it('should inform all interested parties', function () {

      promisedOrder.then(pawel.eat);
      promisedOrder.then(pete.eat);

      pizzaCompany.deliverMargherita();

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Pawel is eating delicious Margherita Pizza']);
      expect($log.info.logs).toContain(['Pete is eating delicious Margherita Pizza']);
      expect($log.info.logs.length).toEqual(2);
    });

    it('should resolve chained promises', function () {

      function slicePizza(pizza){
        return 'sliced ' + pizza;
      }

      var promisedOrder = pizzaCompany.orderMargherita();

      promisedOrder
        .then(slicePizza)
        .then(pawel.eat);

      pizzaCompany.deliverMargherita();

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Pawel is eating delicious sliced Margherita Pizza']);
    });


    it('should fail chained promises with the original reason', function () {

      function slicePizza(pizza){
        return 'sliced ' + pizza;
      }

      var promisedOrder = pizzaCompany.orderMargherita();

      promisedOrder
        .then(slicePizza)
        .then(pawel.eat, pawel.beHungry);

      pizzaCompany.outOfMargheritas();

      $rootScope.$digest();

      expect($log.warn.logs).toContain([ 'Pawel is hungry and sad because: there are no Margherita pizzas left' ]);
    });
  });

  describe('fresh made salads bar', function () {
    var servePreparedOrder, pawel;

    beforeEach(function() {
      pawel = createCustomer('Pawel', $log);
    });

    it('should wait for all the ingredients', function () {

      var servePreparedOrder = $q.defer();
      var promisedOrder = servePreparedOrder.promise;

      var bringTomatoes = $q.defer();
      var bringLettuce = $q.defer();

      promisedOrder.then(function(salad){
        pawel.eat(salad);
      });

      var ingredientsPromise = $q.all([bringTomatoes.promise, bringLettuce.promise]);
      ingredientsPromise.then(function prepareSalad(ingredients) {
        servePreparedOrder.resolve("Fresh salad with: "+ingredients.join(' and '));
      });

      bringTomatoes.resolve(['red tomatoes', ['green tomatoes']]);
      bringLettuce.resolve('lettuce');

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Pawel is eating delicious Fresh salad with: red tomatoes,green tomatoes and lettuce']);
    });

    it('should wait for all the ingredients even if some of them ready', function () {

      var servePreparedOrder = $q.defer();
      var promisedOrder = servePreparedOrder.promise;

      var bringTomatoes = $q.defer();

      promisedOrder.then(function(salad){
        pawel.eat(salad);
      });

      var ingredientsPromise = $q.all([bringTomatoes.promise, $q.when('lettuce')]);
      ingredientsPromise.then(function prepareSalad(ingredients) {
        servePreparedOrder.resolve("Fresh salad with: "+ingredients.join(' and '));
      });

      bringTomatoes.resolve(['red tomatoes', ['green tomatoes']]);

      $rootScope.$digest();

      expect($log.info.logs).toContain(['Pawel is eating delicious Fresh salad with: red tomatoes,green tomatoes and lettuce']);
    });

    it('should fail if one of ingredients is missing', function () {

      var servePreparedOrder = $q.defer();
      var promisedOrder = servePreparedOrder.promise;

      var bringTomatoes = $q.defer();
      var bringLettuce = $q.defer();

      promisedOrder.then(function(salad){
        pawel.eat(salad);
      }, function(reason) {
        pawel.beHungry(reason);
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

      expect($log.warn.logs).toContain(['Pawel is hungry and sad because: no fresh lettuce']);
    });
  });

});