import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import userActionType from '../../actions/actionTypes/userActionType';
import UserActions from '../../actions/UserActions';
import userData from '../../__mocks__/mock-data/userMockData';


const middlewaresponse = [thunk];
const mockStore = configureMockStore(middlewaresponse);

describe('User Aciton', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('User registration', () => {
    it('should create USERS_SIGNUP_SUCCESS after successfully creating a user', (done) => {
      const { request, response } = userData.siginUp;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 201,
          response,
        });
      });

      const expectedActions = [
        { type: userActionType.SIGNUP_REQUEST, data: request },
        { type: userActionType.SIGNUP_SUCCESS, data: response.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.register(request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should create USERS_SIGNUP_FAILURE after successfully creating a user', (done) => {
      const { request, error } = userData.siginUp;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 409,
          response: error,
        });
      });

      const expectedActions = [
        { type: userActionType.SIGNUP_REQUEST, data: request },
        { type: userActionType.SIGNUP_FAILURE, data: error.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.register(request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('Complete Registration', () => {
    it('should create VERIFY_SUCCESS after successfully completing user registration', (done) => {
      const { request: { token }, response } = userData.completeReg;
      // moxios.stubRequest(`/api/v1/users/completeRegistration?token=${token}`, {
      //   status: 200,
      //   response
      // });

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: userActionType.VERIFY_REQUEST, data: token },
        { type: userActionType.VERIFY_SUCCESS, data: response.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.completeRegistration(token)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should create VERIFY_FAILURE after user registration fails because token is expired', (done) => {
      const { request: { token }, tokenError } = userData.completeReg;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 403,
          response: tokenError,
        });
      });

      const expectedActions = [
        { type: userActionType.VERIFY_REQUEST, data: token },
        { type: userActionType.VERIFY_FAILURE, data: tokenError.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.completeRegistration(token)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should create VERIFY_FAILURE after user registration fails because user already exist', (done) => {
      const { request: { token }, error } = userData.completeReg;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 409,
          response: error,
        });
      });

      const expectedActions = [
        { type: userActionType.VERIFY_REQUEST, data: token },
        { type: userActionType.VERIFY_FAILURE, data: error.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.completeRegistration(token)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('User authentication', () => {
    it('should create USERS_SIGNIN_SUCCESS after successfully authenticating a user', (done) => {
      const { request, response } = userData.signIn;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: userActionType.SIGNIN_REQUEST, data: request },
        { type: userActionType.SIGNIN_SUCCESS, data: response.userDetails }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.login(request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should create USERS_SIGNIN_FAILURE after successfully creating a user', async (done) => {
      const { request, error } = userData.signIn;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 401,
          response: error,
        });
      });

      const expectedActions = [
        { type: userActionType.SIGNIN_REQUEST, data: request },
        { type: userActionType.SIGNIN_FAILURE, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(UserActions.login(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Request Password Request', () => {
    it('should create RESET_SUCCESS after successfully authenticating a user', (done) => {
      const { request, response } = userData.resetRequest;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: userActionType.FORGOT_PASSWORD_REQUEST, data: request },
        { type: userActionType.FORGOT_PASSWORD_SUCCESS, data: response.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.resetRequest(request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should create RESET_FAILURE after successfully creating a user', async (done) => {
      const { request, error } = userData.resetRequest;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 401,
          response: error,
        });
      });

      const expectedActions = [
        { type: userActionType.FORGOT_PASSWORD_REQUEST, data: request },
        { type: userActionType.FORGET_PASSWORD_FAILURE, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(UserActions.resetRequest(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Request Password', () => {
    it('should create RESET_SUCCESS after successfully reseting a password', (done) => {
      const { request, response } = userData.resetPassword;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: userActionType.RESET_REQUEST, data: request },
        { type: userActionType.RESET_SUCCESS, data: response.message }
      ];

      const store = mockStore({});

      return store.dispatch(UserActions.resetPassword(request)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should create RESET_FAILURE after failing to reset a password', async (done) => {
      const { request, error } = userData.resetPassword;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 400,
          response: error,
        });
      });

      const expectedActions = [
        { type: userActionType.RESET_REQUEST, data: request },
        { type: userActionType.RESET_FAILURE, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(UserActions.resetPassword(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});

