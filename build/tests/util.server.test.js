'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('../env.test');

var _mailTemplate = require('../config/mailTemplate');

var mailTemplate = _interopRequireWildcard(_mailTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mail Message Template', function () {
  it('should generate a message for new user accout', function (done) {
    var body = '<p>Welcome user.</p><br/><p>Click the link below to complete your registration</p><br />\n                  <a href="' + mailTemplate.getHostname() + '/verified?token=1234567890">Complete Registration</a><br/>';
    var test = mailTemplate.messageBody.accountCreated('user', 1234567890);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message for password reset', function (done) {
    var body = '<p>Welcome user.</p><br/><p>Click the link below to reset your password</p><br />\n                  <a href="' + mailTemplate.getHostname() + '/reset-password?token=1234567890">Reset Password</a><br/>\n                  This link expires in 15 mins';
    var test = mailTemplate.messageBody.resetPassword('user', 1234567890);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message when new event is created', function (done) {
    var body = '<p>Well done user.</p><br/><p>You have successfully created an event.<br />You would get a response shortly from the event center\n                </p>Thank you for using EventsManager';
    var test = mailTemplate.messageBody.eventCreated('user');
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message when an event is approved', function (done) {
    var body = '<p>Hello user</p><br/>\n                <p> This is to inform you that your event in DisneyLand, scheduled for December 12th 2020 has been accepted by the center<br />\n                  You can now proceed with you planning.<br/>Do ensure to visit the center for more informations\n                </p>Thank you for using EventsManager';
    var startDate = (0, _moment2.default)('2020-12-12').format('MMMM Do YYYY');
    var test = mailTemplate.messageBody.eventApproved('user', 'DisneyLand', startDate);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message when an event is rejected', function (done) {
    var body = '<p>Hello user</p><br/>\n              <p> Unfortunately your event in DisneyLand, scheduled for December 12th 2020 has been cancelled by the center.<br />\n              However, The center would like you to reschedule your event<br/>\n              </p> Thank you for using EventsManager';
    var startDate = (0, _moment2.default)('2020-12-12').format('MMMM Do YYYY');
    var test = mailTemplate.messageBody.eventRejected('user', 'DisneyLand', startDate);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });
});
//# sourceMappingURL=util.server.test.js.map