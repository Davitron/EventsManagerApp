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
  isMailSent(mail) {
    mailTransport.sendMail(mail, (err, info) => {
      let status;
      if (err) {
        console.log(err, process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD);
        status = false;
      } else {
        console.log(`Message sent: ${info.messageId}`);
        status = true;
      }
      return status;
    });
  }
}

