var NotificationsArchive = function() {
  this.archivedNotifications = [];
};
NotificationsArchive.prototype.archive = function(notification) {
  this.archivedNotifications.push(notification);
};
NotificationsArchive.prototype.getArchived = function() {
  return this.archivedNotifications;
};