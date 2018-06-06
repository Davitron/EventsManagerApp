
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import mainActionType from '../../actions/actionTypes/mainActionType';
import CenterActions from '../../actions/CenterActions';
import centerData from '../../__mocks__/mock-data/centerMockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const history = {
  push: jest.fn(),
};

describe('Center Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Testing action for getting all centers', () => {
    it('should create GETALL_REQUEST and GETALL_SUCCESS actions when fetching centers', async (done) => {
      const { request, response } = centerData.getAll;
      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });
      const expectedActions = [
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.GETALL_SUCCESS, data: response }
      ];
      const store = mockStore({});
      await store.dispatch(CenterActions.getAll(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it(`should create GETALL_REQUEST and GETALL_SUCCESS
      actions when fetching centers with query without limit and page`, async (done) => {
        const { requestWithoutLimit, response } = centerData.getAll;

        moxios.wait(() => {
          const req = moxios.requests.mostRecent();
          req.respondWith({
            status: 200,
            response,
          });
        });

        const expectedActions = [
          { type: mainActionType.GETALL_REQUEST, data: null },
          { type: mainActionType.GETALL_SUCCESS, data: response }
        ];

        const store = mockStore({});

        await store.dispatch(CenterActions.getAll(requestWithoutLimit));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });

    it('should create GETALL_REQUEST and GETALL_SUCCESS actions when fetching centers without a query', async (done) => {
      const { response } = centerData.getAll;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.GETALL_SUCCESS, data: response }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.getAll());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create GETALL_REQUEST and GETALL_FAILED actions if no center is found', async (done) => {
      const { request, error } = centerData.getAll;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 404,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.GETALL_FAILED, data: error }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.getAll(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing action for getting a single center', () => {
    it('should create GET_REQUEST and GET_SUCCESS actions when fetching centers', async (done) => {
      const { request, response } = centerData.getSingle;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.GET_REQUEST, data: null },
        { type: mainActionType.GET_SUCCESS, data: response }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.getCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create GET_REQUEST and GET_FAILED actions if no center is found', async (done) => {
      const { request, error } = centerData.getSingle;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 404,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.GET_REQUEST, data: null },
        { type: mainActionType.GET_FAILED, data: error }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.getCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing action for getting all states', () => {
    it('should create GETSTATES_REQUEST and GETSTATES_SUCCESS actions when fetching centers', async (done) => {
      const { request, response } = centerData.getStates;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.GETSTATES_REQUEST, data: [] },
        { type: mainActionType.GETSTATES_SUCCESS, data: response.states }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.getAllStates(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create GET_REQUEST and GETSTATES_FAILED actions if no center is found', async (done) => {
      const { request, error } = centerData.getStates;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 404,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.GETSTATES_REQUEST, data: [] },
        { type: mainActionType.GETSTATES_FAILED, data: error }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.getAllStates(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing action for creating a center', () => {
    it('should create CREATE_REQUEST and CREATE_SUCCESS actions after creating a center successfully', async (done) => {
      const { request, response } = centerData.createCenter;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 201,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.CREATE_REQUEST, data: request },
        { type: mainActionType.CREATE_SUCCESS, data: response.message, },
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.RESET_STATE, data: null }
      ];

      history.push = jest.fn();

      const store = mockStore({});

      await store.dispatch(CenterActions.createCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create CREATE_REQUEST and CREATE_FAILED actions if no center is found', async (done) => {
      const { request, error } = centerData.createCenter;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 409,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.CREATE_REQUEST, data: request },
        { type: mainActionType.CREATE_FAILED, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.createCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing an action for updating a center', () => {
    it('should create UPDATE_REQUEST and UPDATE_SUCCESS actions after creating a center successfully', async (done) => {
      const { request, response } = centerData.updateCenter;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.UPDATE_REQUEST, data: request },
        { type: mainActionType.UPDATE_SUCCESS, data: response },
        { type: mainActionType.GET_REQUEST, data: null }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.updateCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create UPDATE_REQUEST and UPDATE_FAILED actions if no center is found', async (done) => {
      const { request, error } = centerData.updateCenter;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 409,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.UPDATE_REQUEST, data: request },
        { type: mainActionType.UPDATE_FAILED, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.updateCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing an action  for deleting a center', () => {
    it('should create DELETE_REQUEST and DELETE_SUCCESS actions after creating a center successfully', async (done) => {
      const { request, response } = centerData.delete;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      history.push = jest.fn();

      const expectedActions = [
        { type: mainActionType.DELETE_REQUEST, data: request },
        { type: mainActionType.DELETE_SUCCESS, data: response.message },
        { type: mainActionType.RESET_STATE, data: null }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.deleteCenter(request, history));
      expect(store.getActions()).toEqual(expectedActions);
      expect(history.push).toHaveBeenCalled();
      done();
    });

    it('should create DELETE_REQUEST and DELETE_FAILED actions if no center is found', async (done) => {
      const { request, error } = centerData.delete;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 404,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.DELETE_REQUEST, data: request },
        { type: mainActionType.DELETE_FAILED, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(CenterActions.deleteCenter(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
