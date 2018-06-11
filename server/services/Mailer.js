import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.load();

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 *
 */
export default class Mailer {
  /**
   *
   * @param {*} mail
   * @returns {boolean} returns a boolean value indicating if mail was sent successfully or not
   */
  useNodemailer(mail) {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      return mailTransport.sendMail(mail, (err, info) => {
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
  sendMail(toEmail, message, title) {
    const mailInfo = {
      from: 'matthews.segunapp@gmail.com',
      to: toEmail,
      subject: title,
      html: message
    };

    return this.useNodemailer(mailInfo);
  }
}

