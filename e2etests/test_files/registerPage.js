require('babel-register');

const registerTest = () => {
  describe('Test suite for register page', () => {
    describe('fill up the register form and signup a new user', () => {
      it('Should check if current page is the register page', (browser) => {
        browser
          .url('http://localhost:8000/register')
          .waitForElementVisible('body', 2000)
          .assert.visible('.navigator')
          .assert.visible('.home')
          .assert.containsText('h3', 'Register')
          .assert.containsText('#to-login', 'Already have an account?');
      });
      it('Should submit the register form with no data inputed', (browser) => {
        browser
          .setValue('input[name=email]', '')
          .pause(1000)
          .setValue('input[name=username]', '')
          .pause(1000)
          .setValue('input[name=password]', '')
          .pause(1000)
          .setValue('input[name=confirmPassword]', '')
          .pause(1000)
          .click('button.ui')
          .assert.containsText('#email', 'The email field is required.')
          .assert.containsText('#username', 'The username field is required.')
          .assert.containsText('#password', 'The password field is required.')
          .assert.containsText('#confirmPassword', 'The confirm password field is required.');
      });
      it('Should submit the register form with wrong email', (browser) => {
        browser
          .setValue('input[name=email]', 'user@local')
          .pause(1000)
          .setValue('input[name=username]', 'coder')
          .pause(1000)
          .setValue('input[name=password]', 'minerva')
          .pause(1000)
          .setValue('input[name=confirmPassword]', 'minerva')
          .pause(1000)
          .click('button.ui')
          .assert.containsText('#email', 'The email format is invalid.');
      });
      it('Should clear all fields in the register form', (browser) => {
        browser
          .clearValue('input[name=email]')
          .clearValue('input[name=username]')
          .clearValue('input[name=password]')
          .clearValue('input[name=confirmPassword]');
      });
      it('Should submit the register form with correct data', (browser) => {
        browser
          .setValue('input[name=email]', 'matthews.segun@gmail.com')
          .pause(1000)
          .setValue('input[name=username]', 'coder')
          .pause(1000)
          .setValue('input[name=password]', 'minerva')
          .pause(1000)
          .setValue('input[name=confirmPassword]', 'minerva')
          .pause(1000)
          .click('button.ui')
          .pause(3000);
      });
    });

    describe('Redirect to email verification page', () => {
      it('Should check if it is in home page', (client) => {
        client
          .waitForElementVisible('#verify', 3000)
          .assert.urlContains('http://localhost:8000/verify')
          .pause(2000)
          .assert.containsText('#verify', 'Registration Successful.')
          .pause(1000);
      });
    });
  });
};

export default registerTest;
