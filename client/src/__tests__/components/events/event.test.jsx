import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedEvent, { Event } from '../../../components/event/events';

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
  centers: {},
  newCenter: {},
  allStates: {},
};

const dispatch = fn => fn;

const updateEvent = jest.fn();
let deleteId = null;
const deleteEvent = (id) => {
  deleteId = id;
};

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
      updateEvent,
      deleteEvent,
    };
    history.push = jest.fn();
    mountedComponent = shallow(<Event {...props} />);
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
    expect(wrapper.state().openModal).toEqual(false);
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

  it('testing on search function', () => {
    wrapper.instance().onSearch({ limit: 9, page: 1 });
    expect(history.push).toHaveBeenCalled();
  });

  it('testing on onSubmit function', () => {
    const event = {
      eventName: 'Test Arena',
      centerId: 2,
      days: '2',
      image: {
        files: []
      },
      startDate: '2018-12-12'
    };
    wrapper = getComponent();
    wrapper.instance().onSubmit(event);
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().isRequestMade).toEqual(true);
  });

  it('testing on onSubmit function', () => {
    const event = {
      eventName: 'Test Arena',
      centerId: 2,
      days: 'laaa',
      image: {
        files: []
      },
      startDate: '2018-12-12'
    };

    wrapper.instance().onSubmit(event);
    expect(Object.keys(wrapper.state().errors).length).toBeGreaterThan(0);
    expect(wrapper.state().isRequestMade).toEqual(false);
  });

  it('testing show modal function', () => {
    const event = {
      eventName: 'Test Arena',
      centerId: 2,
      days: '2',
      image: {
        files: []
      },
      startDate: '2018-12-12'
    };

    wrapper.instance().showModal(event);
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().selectedEvent).toEqual(event);
    expect(wrapper.state().openModal).toEqual(true);
  });

  it('testing hide modal function', () => {
    wrapper.instance().hideModal();
    expect(wrapper.state().openModal).toEqual(false);
  });

  it('testing show modal function', () => {
    const event = {
      eventName: 'Test Arena',
      centerId: 2,
      days: '2',
      image: {
        files: []
      },
      startDate: '2018-12-12'
    };
    wrapper.instance().showPrompt(event);
    expect(wrapper.state().isRequestMade).toEqual(false);
    expect(wrapper.state().selectedEvent).toEqual(event);
    expect(wrapper.state().openPrompt).toEqual(true);
  });

  it('testing hide prompt function', () => {
    wrapper.instance().hidePrompt();
    expect(wrapper.state().openPrompt).toEqual(false);
  });

  it('testing handle delete function', () => {
    wrapper.setState({
      selectedEvent: {
        id: 2,
        eventName: 'test event'
      }
    });
    wrapper.instance().handleDelete();
    expect(deleteId).toBe(wrapper.state().selectedEvent.id);
  });
});

describe('Connected Component', () => {
  describe('Connected Events Component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response,
      });
      wrapper = shallow(<ConnectedEvent store={store} history={history} location={location} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
