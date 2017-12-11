import nodemailer from 'nodemailer';

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'matthews.segun@gmail.com',
    pass: 'davitron'
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
        console.log(err);
        status = false;
      } else {
        console.log(`Message sent: ${info.messageId}`);
        status = true;
      }
      return status;
    });
  }
}

