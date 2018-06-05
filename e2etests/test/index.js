require('babel-register');

const registerTest = require('../test_files/registerPage').default;
const loginTest = require('../test_files/loginPage').default;
const preTest = require('../test_files/preTest').default;
const createUpdateCenterTest = require('../test_files/createCenter').default;
const searchCenterTest = require('../test_files/searchCenter').default;
const updateEventTest = require('../test_files/updateEvent').default;
const respondToEventTest = require('../test_files/respondToEvent').default;


const RunUserAuth = () => {
  registerTest();
  loginTest();
};

const RunCreateCenter = () => {
  preTest();
  createUpdateCenterTest();
};

const RunEventBooking = () => {
  preTest();
  searchCenterTest();
};

const RunUpdateDeleteEvent = () => {
  preTest();
  updateEventTest();
};

const RunRespondToEventTest = () => {
  preTest();
  respondToEventTest();
};

RunUserAuth();
RunCreateCenter();
RunEventBooking();
RunUpdateDeleteEvent();
RunRespondToEventTest();
