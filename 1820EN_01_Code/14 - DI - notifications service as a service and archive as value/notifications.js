var NotificationsService = function (notificationsArchive) {
  this.MAX_LEN = 10;
  this.notificationsArchive = notificationsArchive;
  this.notifications = [];
};

NotificationsService.prototype.push = function (notification) {

  var notificationToArchive;
  var newLen = this.notifications.unshift(notification);
  if (newLen > this.MAX_LEN) {
    notificationToArchive = this.notifications.pop();
    this.notificationsArchive.archive(notificationToArchive);
  }
};

NotificationsService.prototype.getCurrent = function () {
  return this.notifications;
};
