import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedCenterEvent, { CenterEvent } from '../../../components/event/CenterEvent';

jest.mock('../../../helpers/image-upload', () => jest.fn(() => Promise.resolve({})));

let mountedComponent;

let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

const response = {
  events: {},
  newEvents: {}
};

const dispatch = fn => fn;

const getAll = jest.fn();
const respondeToEvent = id => id;

const location = {};


const mockStore = configureStore();
let wrapper;

/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    props = {
      dispatch,
      response,
      history,
      location,
      getAll,
      respondeToEvent,
    };
    history.push = jest.fn();
    mountedComponent = shallow(<CenterEvent {...props} />);
  }
  return mountedComponent;
};

describe('Event Component', () => {
  beforeAll(() => {
    wrapper = getComponent();
  });


  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      response: {
        ...response,
        events: {
          status: 'success',
          data: {
            message: 'Events Retrieved',
            data: [
              { id: 1, eventName: 'new Event' },
              { id: 2, eventName: ' another Event' }
            ],
            metadata: {
              pagination: {
                page: 1,
                limit: 9
              }
            }
          }
        },
        newEvent: {
          status: 'success',
          data: {
            eventName: 'new Event',
          }
        },
        deleteStatus: {
          status: 'success',
        }
      },
      location: {
        search: '/events'
      }
    };

    const eventsResponse = nextProps.response.events;
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().isRequestMade).toEqual(false);
    expect(wrapper.state().data).toEqual(eventsResponse.data.data);
  });

  it('testing on change page function', () => {
    wrapper.instance().onChangePage(1);
    expect(history.push).toHaveBeenCalled();
  });

  it('testing on page size change', () => {
    wrapper.instance().onPageSizeChange(1, 9);
    expect(history.push).toHaveBeenCalled();
  });

  it('testing show approve prompt function', () => {
    const event = {
      eventName: 'Test Arena',
      centerId: 2,
      days: '2',
      image: {
        files: []
      },
      startDate: '2018-12-12'
    };
    wrapper.instance().showApprovePrompt(event);
    expect(wrapper.state().openPrompt).toEqual(true);
    expect(wrapper.state().selectedEvent).toEqual(event);
    expect(wrapper.state().isRequestMade).toEqual(false);
    expect(wrapper.state().mode).toEqual('ACCEPT');
  });

  it('testing show approve prompt function', () => {
    const event = {
      eventName: 'Test Arena',
      centerId: 2,
      days: '2',
      image: {
        files: []
      },
      startDate: '2018-12-12'
    };
    wrapper.instance().showDeclinePrompt(event);
    expect(wrapper.state().openPrompt).toEqual(true);
    expect(wrapper.state().selectedEvent).toEqual(event);
    expect(wrapper.state().isRequestMade).toEqual(false);
    expect(wrapper.state().mode).toEqual('REJECT');
  });


  it('testing hide prompt function', () => {
    wrapper.instance().hidePrompt();
    expect(wrapper.state().openPrompt).toEqual(false);
  });

  it('testing handle response function', () => {
    wrapper.setState({
      mode: 'ACCEPT'
    });
    wrapper.instance().handleResponse();
    expect(wrapper.state().isRequestMade).toEqual(true);
  });
});

describe('Connected Component', () => {
  describe('Connected Events Component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response,
      });
      wrapper = shallow(<ConnectedCenterEvent
        store={store}
        history={history}
        location={location}
      />);
      expect(wrapper.length).toBe(1);
    });
  });
});
