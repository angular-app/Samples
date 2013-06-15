angular.module('notificationsApp', [])
  .controller('NotificationsCtrl', function ($scope, notificationsService) {

    $scope.addNotification = function () {
      notificationsService.push($scope.notification);
      $scope.notification = '';
    };

    $scope.getNotifications = function () {
      return notificationsService.getCurrent();
    };

}).service('notificationsService', NotificationsService)
  .value('notificationsArchive', new NotificationsArchive());