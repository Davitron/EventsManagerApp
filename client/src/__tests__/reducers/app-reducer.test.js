import expect from 'expect';
import mainActionType from '../../actions/actionTypes/main-action-types';
import AppReducer from '../../reducers/app-reducer';
import initialState from '../../initial-state';

const mockData = [
  {
    eventName: 'TEST',
    startDate: '2027-12-12',
    endDate: '2027=12=13'
  },
  {
    eventName: 'TEST 2',
    startDate: '2027-12-14',
    endDate: '2027=12=15'
  },
];

describe('App Reducer', () => {
  describe('Test behaviour for GETALL', () => {
    it('should change state whenever a GETALL_REQUEST is dispatched by any action', () => {
      const nextState = {
        status: 'fetching',
        data: null
      };

      const action = {
        type: mainActionType.GETALL_REQUEST,
        data: null
      };

      const newState = AppReducer.getAll(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(null);
    });

    it('should change state whenever a GETALL_SUCCESS is dispatched by any action', () => {
      const nextState = {
        status: 'success',
        data: mockData
      };

      const action = {
        type: mainActionType.GETALL_SUCCESS,
        data: mockData
      };

      const newState = AppReducer.getAll(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should change state whenever a GETALL_FAILED is dispatched by any action', () => {
      const nextState = {
        status: 'failed',
        data: 'Error occured'
      };

      const action = {
        type: mainActionType.GETALL_FAILED,
        data: 'Error occured'
      };

      const newState = AppReducer.getAll(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if no action type is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: null,
        data: null
      };

      const newState = AppReducer.getAll(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if RESET_STATE is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: mainActionType.RESET_STATE,
        data: null
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Test behaviour for GET', () => {
    it('should change state whenever a GET_REQUEST is dispatched by any action', () => {
      const nextState = {
        status: 'fetching',
        data: null
      };

      const action = {
        type: mainActionType.GET_REQUEST,
        data: null
      };

      const newState = AppReducer.get(initialState.app, action);
      // expect(newState.type).toBeA('string');
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(null);
    });

    it('should change state whenever a GET_SUCCESS is dispatched by any action', () => {
      const nextState = {
        status: 'success',
        data: {
          eventName: 'TEST',
          startDate: '2027-12-12',
          endDate: '2027=12=13'
        },
      };

      const action = {
        type: mainActionType.GET_SUCCESS,
        data: {
          eventName: 'TEST',
          startDate: '2027-12-12',
          endDate: '2027=12=13'
        },
      };

      const newState = AppReducer.get(initialState.app, action);
      // expect(newState.type).toBeA('string');
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should change state whenever a GET_FAILED is dispatched by any action', () => {
      const nextState = {
        status: 'failed',
        data: 'Error occured'
      };

      const action = {
        type: mainActionType.GET_FAILED,
        data: 'Error occured'
      };

      const newState = AppReducer.get(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if no action type is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: null,
        data: null
      };

      const newState = AppReducer.get(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if RESET_STATE is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: mainActionType.RESET_STATE,
        data: null
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Test behaviour for CREATE', () => {
    it('should change state whenever a CREATE_REQUEST is dispatched by any action', () => {
      const nextState = {
        status: 'ongoing',
        data: null
      };

      const action = {
        type: mainActionType.CREATE_REQUEST,
        data: null
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(null);
    });

    it('should change state whenever a CREATE_SUCCESS is dispatched by any action', () => {
      const nextState = {
        status: 'success',
        data: {
          eventName: 'TEST',
          startDate: '2027-12-12',
          endDate: '2027=12=13'
        },
      };

      const action = {
        type: mainActionType.CREATE_SUCCESS,
        data: {
          eventName: 'TEST',
          startDate: '2027-12-12',
          endDate: '2027=12=13'
        },
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should change state whenever a CREATE_FAILED is dispatched by any action', () => {
      const nextState = {
        status: 'failed',
        data: 'Error occured'
      };

      const action = {
        type: mainActionType.CREATE_FAILED,
        data: 'Error occured'
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if RESET_STATE is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: mainActionType.RESET_STATE,
        data: null
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if no action type is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: null,
        data: null
      };

      const newState = AppReducer.create(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Test behaviour for UPDATE', () => {
    it('should change state whenever a UPDATE_REQUEST is dispatched by any action', () => {
      const nextState = {
        status: 'ongoing',
        data: null
      };

      const action = {
        type: mainActionType.UPDATE_REQUEST,
        data: null
      };

      const newState = AppReducer.update(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(null);
    });

    it('should change state whenever a UPDATE_SUCCESS is dispatched by any action', () => {
      const nextState = {
        status: 'success',
        data: {
          eventName: 'TEST',
          startDate: '2027-12-17',
          endDate: '2027-12-19'
        },
      };

      const action = {
        type: mainActionType.UPDATE_SUCCESS,
        data: {
          eventName: 'TEST',
          startDate: '2027-12-17',
          endDate: '2027-12-19'
        },
      };

      const newState = AppReducer.update(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should change state whenever a UPDATE_FAILED is dispatched by any action', () => {
      const nextState = {
        status: 'failed',
        data: 'Error occured'
      };

      const action = {
        type: mainActionType.UPDATE_FAILED,
        data: 'Error occured'
      };

      const newState = AppReducer.update(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if RESET_STATE is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: mainActionType.RESET_STATE,
        data: null
      };

      const newState = AppReducer.update(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if no action type is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: null,
        data: null
      };

      const newState = AppReducer.update(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Test behaviour for DELETE', () => {
    it('should change state whenever a DELETE_REQUEST is dispatched by any action', () => {
      const nextState = {
        status: 'ongoing',
        data: null
      };

      const action = {
        type: mainActionType.DELETE_REQUEST,
        data: null
      };

      const newState = AppReducer.deleteItem(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(null);
    });

    it('should change state whenever a DELETE_SUCCESS is dispatched by any action', () => {
      const nextState = {
        status: 'success',
        data: 'successfully deleted'
      };

      const action = {
        type: mainActionType.DELETE_SUCCESS,
        data: 'successfully deleted'
      };

      const newState = AppReducer.deleteItem(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should change state whenever a DELETE_FAILED is dispatched by any action', () => {
      const nextState = {
        status: 'failed',
        data: 'Error occured'
      };

      const action = {
        type: mainActionType.DELETE_FAILED,
        data: 'Error occured'
      };

      const newState = AppReducer.deleteItem(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if RESET_STATE is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: mainActionType.RESET_STATE,
        data: null
      };

      const newState = AppReducer.deleteItem(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if no action type is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: null,
        data: null
      };

      const newState = AppReducer.deleteItem(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });

  describe('Test behaviour for GETALLSTATES', () => {
    it('should change state whenever a GETALL_REQUEST is dispatched by any action', () => {
      const nextState = {
        status: 'fetching',
        data: []
      };

      const action = {
        type: mainActionType.GETSTATES_REQUEST,
        data: []
      };

      const newState = AppReducer.getAllStates(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual([]);
    });

    it('should change state whenever a GETALL_SUCCESS is dispatched by any action', () => {
      const nextState = {
        status: 'success',
        data: mockData
      };

      const action = {
        type: mainActionType.GETSTATES_SUCCESS,
        data: mockData
      };

      const newState = AppReducer.getAllStates(initialState.app, action);
      // expect(newState.type).toBeA('string');
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should change state whenever a GETALL_FAILED is dispatched by any action', () => {
      const nextState = {
        status: 'failed',
        data: 'Error occured'
      };

      const action = {
        type: mainActionType.GETSTATES_FAILED,
        data: 'Error occured'
      };

      const newState = AppReducer.getAllStates(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });

    it('should return initial state if no action type is dispatched', () => {
      const nextState = initialState.app;

      const action = {
        type: null,
        data: null
      };

      const newState = AppReducer.getAllStates(initialState.app, action);
      expect(newState.status).toEqual(nextState.status);
      expect(newState.data).toEqual(nextState.data);
    });
  });
});
