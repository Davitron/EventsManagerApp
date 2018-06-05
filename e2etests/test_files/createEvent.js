require('babel-register');

const path = require('path');

const createEventTest = () => {
  describe('Test suite for center details page', () => {
    describe('viewing and updating a center', () => {
      it('Should try to create an event with no data inputed', (browser) => {
        browser
          .useXpath()
          .click('//div/button[text()="Book an Event Here"]')
          .pause(1000)
          .useCss()
          .setValue('input[name=eventName]', '')
          .pause(1000)
          .setValue('input[name=days]', '')
          .pause(1000)
          .setValue('input[name=startDate]', '')
          .pause(1000)
          .useXpath()
          .click('//div/button[text()="create"]')
          .useCss()
          .pause(1000)
          .assert.visible('div.error.field')
          .pause(1000);
      });
      it('Should sumbit a form with past date', (browser) => {
        browser
          .setValue('input[name=eventName]', 'Judgement day')
          .pause(1000)
          .setValue('input[name=days]', '1')
          .pause(1000)
          .setValue('input[name=startDate]', '01/01/2017')
          .pause(1000)
          .setValue(
            'input[type=file]',
            path.resolve(`${__dirname}/../assets/1.jpg`)
          )
          .pause(1000)
          .useXpath()
          .click('//div/button[text()="create"]')
          .useCss()
          .waitForElementVisible('div.toastify', 15000)
          .assert.visible('div.toastify')
          .pause(1000);
      });
      it('Should sumbit a form with correct data', (browser) => {
        browser
          .useXpath()
          .click('//div/button[text()="Book an Event Here"]')
          .useCss()
          .pause(1000)
          .setValue('input[name=eventName]', 'Judgement day')
          .pause(1000)
          .setValue('input[name=days]', '1')
          .pause(1000)
          .setValue('input[name=startDate]', '01/01/2019')
          .pause(1000)
          .setValue(
            'input[type=file]',
            path.resolve(`${__dirname}/../assets/1.jpg`)
          )
          .pause(1000)
          .useXpath()
          .click('//div/button[text()="create"]')
          .useCss()
          .waitForElementVisible('div.toastify', 15000)
          .assert.visible('div.toastify')
          .pause(1000)
          .end();
      });
    });
  });
};

export default createEventTest;
