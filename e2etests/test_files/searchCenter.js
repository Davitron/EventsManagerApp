require('babel-register');
const path = require('path');


const searchCenterTest = () => {
  describe('searching and creating a center', () => {
    it('Should check if current page is the register page', (browser) => {
      browser
        .url('http://localhost:8000/centers')
        .waitForElementVisible('body', 2000)
        .pause(1000)
        .assert.visible('.navigator')
        .assert.visible('.background')
        .assert.visible('.my-container')
        .assert.containsText('span', 'Centers');
    });
    it('Should submit the search form when searching with a combination of state and center name', (browser) => {
      browser
        .moveToElement('.states', 10, 10)
        .pause(1000)
        .click('i.dropdown.icon')
        .pause(2000)
        .moveToElement('div[role=listbox]', 10, 10)
        .pause(2000)
        .execute(() => {
          const el = document.querySelectorAll('span.text');
          el[27].click();
        })
        .pause(1000)
        .setValue('input[name=search]', 'Pavilion')
        .pause(1000)
        .click('button.primary')
        .pause(1000)
        .assert.visible('.grid')
        .assert.visible('.row')
        .assert.visible('.column')
        .assert.visible('.card');
    });
    it('Should check if current page is the register page', (browser) => {
      browser
        .url('http://localhost:8000/centers/1')
        .waitForElementVisible('body', 2000)
        .pause(1000)
        .assert.visible('.navigator')
        .assert.visible('.background')
        .assert.visible('.my-container')
        .pause(2000)
        .assert.visible('.w3-image')
        .assert.containsText('span.center-name', 'The Grand Pavilion')
        .assert.visible('table.ui.definition.table')
        .execute(() => {
          window.scrollTo(0, document.body.scrollHeight);
        })
        .pause(2000);
    });
    it('Should try to create an event with no data inputed', (browser) => {
      browser
        .useXpath()
        .moveTo('//div/button[text()="Book an Event Here"]', 10, 10)
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
};

export default searchCenterTest;
