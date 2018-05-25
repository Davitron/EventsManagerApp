require('babel-register');

const loginTest = () => {
  describe('Test suite for login page', () => {
    describe('fill up the login form and signup a new user', () => {
      it('Should check if current page is the login page', (browser) => {
        browser
          .url('http://localhost:8000/login')
          .assert.visible('.navigator')
          .assert.visible('.home')
          .assert.containsText('h3', 'Login');
      });
      it('Should submit the login form with no data inputed', (browser) => {
        browser
          .setValue('input[name=email]', '')
          .pause(1000)
          .setValue('input[name=password]', '')
          .pause(1000)
          .click('button.ui')
          .assert.containsText('#email', 'The email field is required.')
          .assert.containsText('#password', 'The password field is required.');
      });
      it('Should submit the login form with wrong email', (browser) => {
        browser
          .setValue('input[name=email]', 'user@local')
          .pause(1000)
          .setValue('input[name=password]', 'minerva')
          .pause(1000)
          .click('button.ui')
          .assert.containsText('#email', 'The email format is invalid.');
      });
      it('Should clear all fields in the login form', (browser) => {
        browser
          .clearValue('input[name=email]')
          .clearValue('input[name=password]');
      });
      it('Should submit the login form with correct data', (browser) => {
        browser
          .setValue('input[name=email]', 'segunmatthews@outlook.com')
          .pause(1000)
          .setValue('input[name=password]', 'minerva')
          .pause(1000)
          .click('button.ui')
          .pause(3000)
          .waitForElementVisible('#home', 3000)
          .assert.urlContains('http://localhost:8000')
          .pause(1000)
          .end();
      });
    });
  });
};

export default loginTest;
