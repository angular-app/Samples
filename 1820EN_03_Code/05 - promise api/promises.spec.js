describe('pizza pit', function () {

  var Person = function (name, $log) {

    this.eat = function (food) {
      $log.info(name + " is eating delicious " + food);
    };
    this.beHungry = function (reason) {
      $log.warn(name + " is hungry because: " + reason);
    };
  };

  var $q, $exceptionHandler, $log, $rootScope;
  var servePreparedOrder, promisedOrder, pawel, pete;
  beforeEach(inject(function (_$q_, _$exceptionHandler_, _$log_, _$rootScope_) {
    $q = _$q_;
    $exceptionHandler = _$exceptionHandler_;
    $log = _$log_;
    $rootScope = _$rootScope_;
    pawel = new Person('Pawel', $log);
    pete = new Person('Peter', $log);
  }));

  describe('pizza pit', function () {

    describe('$q used directly', function () {

      it('should illustrate basic usage of $q', function () {

        //differed represents a task that will complete (or fail) in the future
        var pizzaOrderFulfillment = $q.defer();

        //the task in the future comes with a promise of task completion (or failrue)
        var pizzaDelivered = pizzaOrderFulfillment.promise;

        pizzaDelivered.then(pawel.eat, pawel.beHungry);

        pizzaOrderFulfillment.resolve('Margherita');
        $rootScope.$digest();

        expect($log.info.logs).toContain(['Pawel is eating delicious Margherita']);
      });
    });

    describe('$q used in a service', function () {

      var Restaurant = function ($q, $rootScope) {

        var currentOrder;

        this.takeOrder = function (orderedItems) {
          currentOrder = {
            deferred:$q.defer(),
            items:orderedItems
          };
          return currentOrder.deferred.promise;
        };

        this.deliverOrder = function() {
          currentOrder.deferred.resolve(currentOrder.items);
          $rootScope.$digest();
        };

        this.problemWithOrder = function(reason) {
          currentOrder.deferred.reject(reason);
          $rootScope.$digest();
        };
      };

      var slice = function(pizza) {
        return "sliced "+pizza;
      };

      var pizzaPit, saladBar;
      beforeEach(function () {
        pizzaPit = new Restaurant($q, $rootScope);
        saladBar = new Restaurant($q, $rootScope);
      });

      it('should illustrate promise rejection', function () {

        var pizzaDelivered = pizzaPit.takeOrder('Capricciosa');
        pizzaDelivered.then(pawel.eat, pawel.beHungry);

        pizzaPit.problemWithOrder('no Capricciosa, only Margherita left');
        expect($log.warn.logs).toContain(['Pawel is hungry because: no Capricciosa, only Margherita left']);
      });

      it('should allow callbacks aggregation', function () {

        var pizzaDelivered = pizzaPit.takeOrder('Margherita');
        pizzaDelivered.then(pawel.eat, pawel.beHungry);
        pizzaDelivered.then(pete.eat, pete.beHungry);

        pizzaPit.deliverOrder();
        expect($log.info.logs).toContain(['Pawel is eating delicious Margherita']);
        expect($log.info.logs).toContain(['Peter is eating delicious Margherita']);
      });

      it('should illustrate successful promise chaining', function () {

        pizzaPit.takeOrder('Margherita').then(slice).then(pawel.eat);

        pizzaPit.deliverOrder();
        expect($log.info.logs).toContain(['Pawel is eating delicious sliced Margherita']);
      });

      it('should illustrate promise rejection in chain', function () {

        pizzaPit.takeOrder('Capricciosa').then(slice).then(pawel.eat, pawel.beHungry);

        pizzaPit.problemWithOrder('no Capricciosa, only Margherita left');
        expect($log.warn.logs).toContain(['Pawel is hungry because: no Capricciosa, only Margherita left']);
      });

      it('should illustrate recovery from promise rejection', function () {

        var retry = function(reason) {
          return pizzaPit.takeOrder('Margherita').then(slice);
        };
        pizzaPit.takeOrder('Capricciosa').then(slice, retry).then(pawel.eat, pawel.beHungry);

        pizzaPit.problemWithOrder('no Capricciosa, only Margherita left');
        pizzaPit.deliverOrder();

        expect($log.info.logs).toContain(['Pawel is eating delicious sliced Margherita']);
      });

      it('should illustrate explicit rejection in chain', function () {

        var explain = function(reason) {
          return $q.reject('ordered pizza not available');
        };

        pizzaPit.takeOrder('Capricciosa').then(slice, explain).then(pawel.eat, pawel.beHungry);
        pizzaPit.problemWithOrder('no Capricciosa, only Margherita left');

        expect($log.warn.logs).toContain(['Pawel is hungry because: ordered pizza not available']);
      });

      it('should illustrate promise aggregation', function () {

        var ordersDelivered = $q.all([
          pizzaPit.takeOrder('Pepperoni'),
          saladBar.takeOrder('Fresh salad')
        ]);

        ordersDelivered.then(pawel.eat);

        pizzaPit.deliverOrder();
        saladBar.deliverOrder();
        expect($log.info.logs).toContain(['Pawel is eating delicious Pepperoni,Fresh salad']);
      });

      it('should illustrate promise aggregation when one of the promises fail', function () {

        var ordersDelivered = $q.all([
          pizzaPit.takeOrder('Pepperoni'),
          saladBar.takeOrder('Fresh salad')
        ]);

        ordersDelivered.then(pawel.eat, pawel.beHungry);

        pizzaPit.deliverOrder();
        saladBar.problemWithOrder('no fresh lettuce');
        expect($log.warn.logs).toContain(['Pawel is hungry because: no fresh lettuce']);
      });

      it('should illustrate promise aggregation with $q.when', function () {

        var ordersDelivered = $q.all([
          pizzaPit.takeOrder('Pepperoni'),
          $q.when('home made salad')
        ]);

        ordersDelivered.then(pawel.eat, pawel.beHungry);

        pizzaPit.deliverOrder();
        expect($log.info.logs).toContain(['Pawel is eating delicious Pepperoni,home made salad']);
      });
    });
  });
});