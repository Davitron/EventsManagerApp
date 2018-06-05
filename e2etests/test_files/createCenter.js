require('babel-register');

const path = require('path');

const createUpdateCenter = () => {
  describe('Test suite for centers page', () => {
    describe('Creating a new event center', () => {
      it('Should pop up modal for creating center when the add button is clicked', (browser) => {
        browser
          .url('http://localhost:8000/centers')
          .waitForElementVisible('body', 2000)
          .pause(1000)
          .click('.fab.pulse')
          .pause(1000)
          .waitForElementVisible('div.ui.page.modals.dimmer.transition.visible.active', 2000)
          .assert.visible('div.ui.small.modal.transition.visible.active')
          .assert.visible('div.content')
          .assert.visible('form')
          .assert.visible('div.actions')
          .pause(1000);
      });
      it('Should sumbit a form with no data inputed', (browser) => {
        browser
          .setValue('input[name=name]', '')
          .pause(1000)
          .execute(() => {
            const el = document.querySelectorAll('i.dropdown.icon');
            el[2].click();
          })
          .pause(1000)
          .execute(() => {
            const el = document.querySelectorAll('span.text');
            el[1].click();
          })
          .setValue('input[name=address]', '')
          .pause(1000)
          .setValue('input[name=hallCapacity]', '')
          .pause(1000)
          .setValue('input[name=carParkCapacity]', '')
          .pause(1000)
          .setValue('input[name=price]', '')
          .pause(1000)
          .useXpath()
          .click('//div/button[text()="create"]')
          .pause(1000);
      });
      it('Should sumbit a form with correct data inputed', (browser) => {
        browser
          .useCss()
          .click('.fab.pulse')
          .pause(1000)
          .setValue('input[name=name]', 'Test Center')
          .pause(1000)
          .execute(() => {
            const el = document.querySelectorAll('i.dropdown.icon');
            el[2].click();
          })
          .pause(1000)
          .execute(() => {
            const el = document.querySelectorAll('span.text');
            el[44].click();
          })
          .setValue('input[name=address]', 'A test address somewhere')
          .pause(1000)
          .setValue('input[name=hallCapacity]', '1000')
          .pause(1000)
          .setValue('input[name=carParkCapacity]', '100')
          .pause(1000)
          .setValue('input[name=price]', '1000000')
          .pause(1000)
          .setValue(
            'input[type=file]',
            path.resolve(`${__dirname}/../assets/1.jpg`)
          )
          .pause(1000)
          .execute(() => {
            const el = document.querySelectorAll('i.dropdown.icon');
            el[3].click();
          })
          .pause(1000)
          .execute(() => {
            const el = document.querySelectorAll('span.text');
            el[84].click();
            el[85].click();
          })
          .pause(100)
          .execute(() => {
            const el = document.querySelectorAll('i.dropdown.icon');
            el[3].click();
          })
          .pause(1000)
          .useXpath()
          .click('//div/button[text()="create"]')
          .useCss()
          .waitForElementVisible('div.toastify', 30000)
          .assert.visible('div.toastify')
          .pause(2000);
      });
      it('Should check if current page is the register page', (browser) => {
        browser
          .url('http://localhost:8000/centers/2')
          .waitForElementVisible('body', 2000)
          .pause(1000)
          .assert.visible('.navigator')
          .assert.visible('.background')
          .assert.visible('.my-container')
          .pause(2000)
          .assert.visible('.w3-image')
          .assert.containsText('span.center-name', 'The Power House')
          .assert.visible('table.ui.definition.table')
          .pause(2000);
      });
      it('Should sumbit a form with correct data inputed', (browser) => {
        browser
          .useXpath()
          .click('//div/button[text()="Update Center"]')
          .pause(1000)
          .useCss()
          .waitForElementVisible('div.ui.page.modals.dimmer.transition.visible.active', 2000)
          .pause(1000)
          .clearValue('input[name=name]')
          .pause(1000)
          .setValue('input[name=name]', 'Grand Lavish Hall')
          .pause(1000)
          .clearValue('input[name=address]')
          .pause(1000)
          .setValue('input[name=address]', 'An address somewhere in Umuahia')
          .pause(100)
          .useXpath()
          .click('//div/button[text()="update"]')
          .useCss()
          .waitForElementVisible('div.toastify', 15000)
          .assert.visible('div.toastify')
          .pause(1000)
          .assert.containsText('span.center-name', 'Grand Lavish Hall')
          .pause(2000)
          .end();
      });
    });
  });
};

export default createUpdateCenter;
