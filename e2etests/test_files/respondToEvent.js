require('babel-register');

const RespondToEventTest = () => {
  describe('Test suite for admin responding to event', () => {
    describe('Accepting and rejecting an event', () => {
      it('Should accept an event', (browser) => {
        browser
          .url('http://localhost:8000/centers/2')
          .waitForElementVisible('div.my-container', 3000)
          .pause(1000)
          .moveTo('a.ui.red.label', 10, 10)
          .pause(3000)
          .click('a.ui.red.label')
          .waitForElementVisible('div.ui.grid', 3000)
          .pause(2000)
          .execute(() => {
            const controls = document.querySelectorAll('button.ui.green.basic.button');
            controls[0].click();
          })
          .pause(1000)
          .waitForElementVisible('div.ui.page.modals.dimmer.transition.visible.active', 2000)
          .pause(1000)
          .execute(() => {
            const controls = document.querySelector('button.ui.blue.inverted.button');
            controls.click();
          })
          .waitForElementVisible('div.toastify', 15000)
          .assert.visible('div.toastify')
          .pause(1000)
          .execute(() => {
            const controls = document.querySelectorAll('button.ui.red.basic.button');
            controls[0].click();
          })
          .pause(1000)
          .waitForElementVisible('div.ui.page.modals.dimmer.transition.visible.active', 2000)
          .pause(1000)
          .execute(() => {
            const controls = document.querySelector('button.ui.blue.inverted.button');
            controls.click();
          })
          .waitForElementVisible('div.toastify', 15000)
          .assert.visible('div.toastify')
          .pause(1000)
          .end();
      });
    });
  });
};

export default RespondToEventTest;
