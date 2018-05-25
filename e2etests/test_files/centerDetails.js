require('babel-register');

const centerDetailsTest = () => {
  describe('Test suite for center details page', () => {
    describe('viewing and updating a center', () => {
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
    });
  });
};

export default centerDetailsTest;
