'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getHostname = exports.getHostname = function getHostname() {
  if (process.env.NODE_ENV === 'development') return process.env.DEVELOPMENT_HOSTURL;
  if (process.env.NODE_ENV === 'production') return process.env.PRODUCTION_HOSTURL;
  return process.env.TEST_HOSTURL;
};

var hostLink = void 0;
var link = void 0;

var messageBody = exports.messageBody = {
  accountCreated: function accountCreated(username, token, host) {
    hostLink = host || process.env.TEST_HOSTURL;
    link = hostLink + '/verified?token=' + token;
    var body = '<p>Welcome ' + username + '.</p><br/><p>Click the link below to complete your registration</p><br />\n                  <a href="' + link + '">Complete Registration</a><br/>';
    return body;
  },

  resetPassword: function resetPassword(username, token, host) {
    hostLink = host || process.env.TEST_HOSTURL;
    link = hostLink + '/reset-password?token=' + token;
    var body = '<p>Welcome ' + username + '.</p><br/><p>Click the link below to reset your password</p><br />\n                  <a href="' + link + '">Reset Password</a><br/>\n                  This link expires in 15 mins';
    return body;
  },

  eventCreated: function eventCreated(username) {
    var body = '<p>Well done ' + username + '.</p><br/><p>You have successfully created an event.<br />You would get a response shortly from the event center\n                </p>Thank you for using EventsManager';
    return body;
  },

  eventApproved: function eventApproved(username, centerName, startDate) {
    var body = '<p>Hello ' + username + '</p><br/>\n                <p> This is to inform you that your event in ' + centerName + ', scheduled for ' + startDate + ' has been accepted by the center<br />\n                  You can now proceed with you planning.<br/>Do ensure to visit the center for more informations\n                </p>Thank you for using EventsManager';

    return body;
  },

  eventRejected: function eventRejected(username, centerName, startDate) {
    var body = '<p>Hello ' + username + '</p><br/>\n              <p> Unfortunately your event in ' + centerName + ', scheduled for ' + startDate + ' has been cancelled by the center.<br />\n              However, The center would like you to reschedule your event<br/>\n              </p> Thank you for using EventsManager';
    return body;
  }
};
//# sourceMappingURL=mailTemplate.js.map