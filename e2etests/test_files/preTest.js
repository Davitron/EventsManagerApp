require('babel-register');

const preTest = () => {
  describe('Test suite for login page', () => {
    describe('fill up the login form and signup a new user', () => {
      it('Should submit the login form with correct data', (browser) => {
        browser
          .url('http://localhost:8000/login')
          .assert.visible('.navigator')
          .assert.visible('.home')
          .assert.containsText('h3', 'Login')
          .setValue('input[name=email]', 'segunmatthews@outlook.com')
          .pause(1000)
          .setValue('input[name=password]', 'minerva')
          .pause(1000)
          .click('button.ui')
          .pause(3000)
          .waitForElementVisible('#home', 3000)
          .assert.urlContains('http://localhost:8000')
          .pause(1000);
      });
    });
  });
};

export default preTest;
