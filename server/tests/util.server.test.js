import moment from 'moment';
import messageBody from '../config/mail-template';


describe('Mail Message Template', () => {
  it('should generate a message for new user accout', (done) => {
    const body = `<p>Welcome user.</p><br/><p>Click the link below to complete your registration</p><br />
                  <a href="http://event-manager-andela.herokuapp.com/verified?token=1234567890">Complete Registration</a><br/>`;
    const test = messageBody.accountCreated('user', 1234567890);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message for password reset', (done) => {
    const body = `<p>Welcome user.</p><br/><p>Click the link below to reset your password</p><br />
                  <a href="http://event-manager-andela.herokuapp.com/reset-password?token=1234567890">Reset Password</a><br/>
                  This link expires in 15 mins`;
    const test = messageBody.resetPassword('user', 1234567890);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message when new event is created', (done) => {
    const body = `<p>Well done user.</p><br/><p>You have successfully created an event.<br />You would get a response shortly from the event center
                </p>Thank you for using EventsManager`;
    const test = messageBody.eventCreated('user');
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message when an event is approved', (done) => {
    const body = `<p>Hello user</p><br/>
                <p> This is to inform you that your event in DisneyLand, scheduled for December 12th 2020 has been accepted by the center<br />
                  You can now proceed with you planning.<br/>Do ensure to visit the center for more informations
                </p>Thank you for using EventsManager`;
    const startDate = moment('2020-12-12').format('MMMM Do YYYY');
    const test = messageBody.eventApproved('user', 'DisneyLand', startDate);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });

  it('should generate a message when an event is rejected', (done) => {
    const body = `<p>Hello user</p><br/>
              <p> Unfortunately your event in DisneyLand, scheduled for December 12th 2020 has been cancelled by the center.<br />
              However, The center would like you to reschedule your event<br/>
              </p> Thank you for using EventsManager`;
    const startDate = moment('2020-12-12').format('MMMM Do YYYY');
    const test = messageBody.eventRejected('user', 'DisneyLand', startDate);
    test.should.be.a('string');
    test.should.be.eql(body);
    done();
  });
});

