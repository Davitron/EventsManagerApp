require('babel-register');

const updateEventTest = () => {
  describe('Test suite for updating an event', () => {
    describe('User on events page', () => {
      it('Should render successfully', (browser) => {
        browser
          .url('http://localhost:8000/events')
          .waitForElementVisible('body', 5000)
          .pause(1000)
          .assert.visible('.navigator')
          .pause(1000)
          .assert.visible('.background')
          .pause(1000)
          .assert.visible('.my-container')
          .pause(1000)
          .assert.visible('.grid')
          .pause(1000);
      });
      it('Should select an event to modify', (browser) => {
        browser
          .execute(() => {
            const controls = document.querySelectorAll('button.ui.green.basic.button');
            controls[0].click();
          })
          .pause(1000)
          .waitForElementVisible('div.ui.page.modals.dimmer.transition.visible.active', 2000)
          .pause(1000)
          .clearValue('input[name=eventName]')
          .pause(1000)
          .setValue('input[name=eventName]', 'Tech meet-up')
          .pause(1000)
          .useXpath()
          .click('//div/button[text()="update"]')
          .useCss()
          .waitForElementVisible('div.toastify', 30000)
          .assert.visible('div.toastify')
          .pause(1000);
      });
      it('Should delete an event', (browser) => {
        browser
          .execute(() => {
            const controls = document.querySelectorAll('button.ui.red.basic.button');
            controls[1].click();
          })
          .pause(1000)
          .waitForElementVisible('div.ui.page.modals.dimmer.transition.visible.active', 2000)
          .pause(1000)
          .execute(() => {
            const controls = document.querySelector('button.ui.blue.inverted.button');
            controls.click();
          })
          .waitForElementVisible('div.toastify', 30000)
          .assert.visible('div.toastify')
          .pause(1000)
          .end();
      });
    });
  });
};

export default updateEventTest;
