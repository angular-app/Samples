var NotificationsService = function (notificationsArchive) {
  this.SHOULD_ARCHIVE = true;
  this.MAX_LEN = 10;
  this.notificationsArchive = notificationsArchive;
  this.notifications = [];
};

NotificationsService.prototype.push = function (notification) {

  var notificationToArchive;
  var newLen = this.notifications.unshift(notification);
  if (newLen > this.MAX_LEN) {
    notificationToArchive = this.notifications.pop();
    if (this.SHOULD_ARCHIVE) {
      this.notificationsArchive.archive(notificationToArchive);
    }
  }
};

NotificationsService.prototype.getCurrent = function () {
  return this.notifications;
};

NotificationsService.prototype.getArchived = function () {
  return this.notificationsArchive.getArchived();
};
