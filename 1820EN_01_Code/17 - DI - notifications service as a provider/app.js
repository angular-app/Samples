angular.module('notificationsApp', [])

  .controller('NotificationsCtrl', function ($scope, notificationsService) {

    $scope.addNotification = function () {
      notificationsService.push($scope.notification);
      $scope.notification = '';
    };

    $scope.getNotifications = function () {
      return notificationsService.getCurrent();
    };
  })

  .config(function(notificationsServiceProvider){
    notificationsServiceProvider.setMaxLen(5);
  })

  .provider('notificationsService', function () {

    var config = {
      maxLen : 10,
      shouldArchive : true
    };
    var notifications = [];

    return {

      setMaxLen : function(maxLen) {
        config.maxLen = maxLen || config.maxLen;
      },

      $get : function(notificationsArchive) {
        return {
          push:function (notification) {
            var notificationToArchive;
            var newLen = notifications.unshift(notification);
            if (newLen > config.maxLen) {
              notificationToArchive = this.notifications.pop();
              notificationsArchive.archive(notificationToArchive);
            }
          },
          getCurrent:function () {
            return notifications;
          }
        };
      }
    };
  })

  .factory('notificationsArchive', function () {

    var archivedNotifications = [];
    return {
      archive:function (notification) {
        archivedNotifications.push(notification);
      },
      getArchived:function () {
        return archivedNotifications;
      }};
  });

