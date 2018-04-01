import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.load();
const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    return mailTransport.sendMail(mail, (err, info) => {
      if (err) {
        return err;
      }
      return 'Message Sent';
    });
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

