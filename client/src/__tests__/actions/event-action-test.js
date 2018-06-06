import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import mainActionType from '../../actions/actionTypes/mainActionType';
import EventActions from '../../actions/EventActions';
import eventData from '../../__mocks__/mock-data/eventMockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Event Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Testing action for getting all events', () => {
    it('should create GETALL_REQUEST and GETALL_SUCCESS actions when fetching events', async (done) => {
      const { request, response } = eventData.getAll;

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

      await store.dispatch(EventActions.getAll(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create GETALL_REQUEST and GETALL_SUCCESS actions when fetching events without a query', async (done) => {
      const { response } = eventData.getAll;

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

      await store.dispatch(EventActions.getAll());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it(`should create GETALL_REQUEST and GETALL_SUCCESS actions
      when fetching events with query without limit and page`, async (done) => {
        const { response } = eventData.getAll;

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

        await store.dispatch(EventActions.getAll({}));
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });


    it('should create GETALL_REQUEST and GETALL_FAILED actions if no event is found', async (done) => {
      const { request, error } = eventData.getAll;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 403,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.GETALL_FAILED, data: error }
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.getAll(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing action for getting all upcoming events', () => {
    it('should create GETALL_REQUEST and GETALL_SUCCESS actions when fetching upcoming events', async (done) => {
      const { requestForPendingEvent, response } = eventData.getAll;

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

      await store.dispatch(EventActions.getUpcomingEvent(requestForPendingEvent));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create GETALL_REQUEST and GETALL_FAILED actions if no upcoming event is found', async (done) => {
      const { requestForPendingEvent, error } = eventData.getAll;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 403,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.GETALL_FAILED, data: error }
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.getUpcomingEvent(requestForPendingEvent));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing action for getting a single event', () => {
    it('should create GET_REQUEST and GET_SUCCESS actions when fetching a single event', async (done) => {
      const { request, response } = eventData.getSingle;

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

      await store.dispatch(EventActions.getEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create GET_REQUEST and GET_FAILED actions if no event is found', async (done) => {
      const { request, error } = eventData.getSingle;

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

      await store.dispatch(EventActions.getEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing action for creating a event', () => {
    it('should create CREATE_REQUEST and CREATE_SUCCESS actions after creating an event successfully', async (done) => {
      const { request, response } = eventData.createEvent;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 201,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.CREATE_REQUEST, data: request },
        { type: mainActionType.CREATE_SUCCESS, data: response.message },
      ];

      const location = [];
      const history = { push: (a) => { location.push(a); } };
      history.push = jest.fn();

      const store = mockStore({});

      await store.dispatch(EventActions.createEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create CREATE_REQUEST and CREATE_FAILED actions if no event is found', async (done) => {
      const { request, error } = eventData.createEvent;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 403,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.CREATE_REQUEST, data: request },
        { type: mainActionType.CREATE_FAILED, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.createEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing an action for updating a center', () => {
    it('should create UPDATE_REQUEST and UPDATE_SUCCESS actions after updating an event successfully', async (done) => {
      const { request, response } = eventData.updateEvents;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.UPDATE_REQUEST, data: request },
        { type: mainActionType.UPDATE_SUCCESS, data: response.message },
        { type: mainActionType.GETALL_REQUEST, data: null },
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.updateEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create UPDATE_REQUEST and UPDATE_FAILED actions if date of an event is booked', async (done) => {
      const { request, error } = eventData.updateEvents;

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

      await store.dispatch(EventActions.updateEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing an action for responding to an event', () => {
    it('should create UPDATE_REQUEST and UPDATE_SUCCESS actions after creating an event successfully', async (done) => {
      const { request, response } = eventData.other;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const expectedActions = [
        { type: mainActionType.UPDATE_REQUEST, data: request.id },
        { type: mainActionType.UPDATE_SUCCESS, data: response.message },
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.RESET_STATE, data: null },
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.respondToEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should create UPDATE_REQUEST and UPDATE_FAILED actions if date is booked', async (done) => {
      const { request, error } = eventData.other;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 409,
          response: error,
        });
      });

      const expectedActions = [
        { type: mainActionType.UPDATE_REQUEST, data: request.id },
        { type: mainActionType.UPDATE_FAILED, data: error.message }
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.respondToEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Testing an action  for deleting a center', () => {
    it('should create DELETE_REQUEST and DELETE_SUCCESS actions after updating an event successfully', async (done) => {
      const { request, response } = eventData.delete;

      moxios.wait(() => {
        const req = moxios.requests.mostRecent();
        req.respondWith({
          status: 200,
          response,
        });
      });

      const location = [];
      const history = { push: (a) => { location.push(a); } };
      history.push = jest.fn();

      const expectedActions = [
        { type: mainActionType.DELETE_REQUEST, data: request },
        { type: mainActionType.DELETE_SUCCESS, data: response },
        { type: mainActionType.GETALL_REQUEST, data: null },
        { type: mainActionType.RESET_STATE, data: null }
      ];

      const store = mockStore({});

      await store.dispatch(EventActions.deleteEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      // expect(history.push).toHaveBeenCalled();
      done();
    });

    it('should create DELETE_REQUEST and DELETE_FAILED actions if no event is found', async (done) => {
      const { request, error } = eventData.delete;

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

      await store.dispatch(EventActions.deleteEvent(request));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
