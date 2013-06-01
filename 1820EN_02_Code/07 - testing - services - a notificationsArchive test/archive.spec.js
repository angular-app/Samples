describe('notifications archive tests', function () {

  var notificationsArchive;
  beforeEach(module('archive'));
  beforeEach(inject(function (_notificationsArchive_) {
    notificationsArchive = _notificationsArchive_;
  }));

  it('should give access to the archived items', function () {
    var notification = {msg: 'Old message.'};
    notificationsArchive.archive(notification);

    expect(notificationsArchive.getArchived()).toContain(notification);
  });
});