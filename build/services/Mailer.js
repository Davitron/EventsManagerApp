'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.load();

var mailTransport = _nodemailer2.default.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 *
 */

var Mailer = function () {
  function Mailer() {
    _classCallCheck(this, Mailer);
  }

  _createClass(Mailer, [{
    key: 'useNodemailer',

    /**
     *
     * @param {*} mail
     * @returns {boolean} returns a boolean value indicating if mail was sent successfully or not
     */
    value: function useNodemailer(mail) {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
        return mailTransport.sendMail(mail, function (err, info) {
          if (err) {
            throw err;
          }
          console.log('Message Sent'); // eslint-disable-line
          return 'Message Sent';
        });
      }
      return null;
    }

    /**
     *
     * @param {*} toEmail
     * @param {*} message
     * @param {*} title
     * @returns {*} sends mail
     */

  }, {
    key: 'sendMail',
    value: function sendMail(toEmail, message, title) {
      var mailInfo = {
        from: 'matthews.segunapp@gmail.com',
        to: toEmail,
        subject: title,
        html: message
      };

      return this.useNodemailer(mailInfo);
    }
  }]);

  return Mailer;
}();

exports.default = Mailer;
//# sourceMappingURL=Mailer.js.map