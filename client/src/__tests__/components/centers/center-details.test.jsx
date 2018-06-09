import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedCenterDetails, { CenterDetails } from '../../../components/center/CenterDetails';

jest.mock('../../../helpers/image-upload', () => jest.fn(() => Promise.resolve({})));

let mountedComponent;

let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

const initialState = {
  data: null,
  status: null
};

const response = {
  response: {
    singleCenter: initialState,
    deleteState: initialState,
    updatedCenter: initialState,
    allStates: initialState,
    newEvent: initialState,
  }
};

let deleteCenter = id => 'center deleted';
let getStates = () => [];
let updateCenter = center => center;
let createEvent = event => event;
let getCenter = (id) => {};

deleteCenter = jest.fn();
getStates = jest.fn();
updateCenter = jest.fn();
createEvent = jest.fn();
getCenter = jest.fn();

const match = {
  params: {
    centerId: 1
  }
};


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
      response,
      history,
      match,
      deleteCenter,
      getCenter,
      getStates,
      createEvent,
      updateCenter
    };
    history.push = jest.fn();
    mountedComponent = shallow(<CenterDetails {...props} />);
  }
  return mountedComponent;
};

describe('Center Component', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    wrapper = getComponent();
    wrapper.setState({
      userRole: 'admin'
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      ...response,
      response: {
        singleCenter: {
          data: {
            message: 'Center Not Found'
          },
          status: 'failed'
        },
        updatedCenter: {
          status: null
        },
        newEvent: {
          status: 'success'
        },
        deleteState: {
          status: 'success'
        },
        allStates: {
          status: 'success'
        }
      }
    };

    wrapper = getComponent();
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().openEventModal).toEqual(false);
    expect(wrapper.state().isRequestMade).toEqual(false);
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      response: {
        singleCenter: {
          data: {
            center: {
              id: 1,
              name: 'test name',
              address: 'This is a test address',
              state: 'abia',
              hallCapacity: 1000,
              carParkCapacity: 600,
              price: 10000,
              image: 'http://res.cloudinary.com/eventsmanager/image/upload/v1526158385/dbw0mohd4lnxs0j17wh0.jpg',
              facilities: [
                'cctv',
                'media support',
                'projector'
              ],
              stateId: 1,
              State: {
                stateName: 'Abia'

              }
            },
            metadata: {
              pendingEventCount: 0
            }
          },
          status: 'success'
        },
        updatedCenter: {
          status: 'success'
        },
        newEvent: {
          status: 'success'
        },
        deleteState: {
          status: 'success'
        },
        allStates: {
          status: 'success'
        }
      }
    };

    wrapper = getComponent();

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().isRequestMade).toEqual(false);
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().openEventModal).toEqual(false);
    expect(wrapper.state().isRequestMade).toEqual(false);
  });

  it('testing on getting pending events function', () => {
    wrapper = getComponent();
    wrapper.instance().getPendingEvent();
    expect(history.push).toHaveBeenCalled();
  });

  it('testing on upcoming event function', () => {
    wrapper = getComponent();
    wrapper.instance().getUpcomingEvent();
    expect(history.push).toHaveBeenCalled();
  });

  it('testing show modal function', () => {
    wrapper = getComponent();
    wrapper.instance().showModal();
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().openModal).toEqual(true);
  });

  it('testing show event modal function', () => {
    wrapper = getComponent();
    wrapper.instance().showEventModal();
    expect(wrapper.state().errors).toEqual({});
    expect(wrapper.state().openEventModal).toEqual(true);
  });

  it('testing show event modal function', () => {
    wrapper = getComponent();
    wrapper.instance().showPrompt();
    expect(wrapper.state().openPrompt).toEqual(true);
    expect(wrapper.state().isRequestMade).toEqual(false);
  });

  it('testing hide modal function', () => {
    wrapper = getComponent();
    wrapper.instance().hideModal();
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().openEventModal).toEqual(false);
  });


  it('testing hide prompt function', () => {
    wrapper = getComponent();
    wrapper.instance().hidePrompt();
    expect(wrapper.state().openPrompt).toEqual(false);
  });

  it('testing on handleDelete function', () => {
    wrapper = getComponent();
    wrapper.instance().handleDelete();
    expect(deleteCenter).toHaveBeenCalled();
  });


  it('testing on delete function', () => {
    const center = {
      name: 'Test Arena',
      stateId: 2,
      address: 'This is a test address for this event center',
      image: {
        files: []
      },
      newImage: {
        files: []
      },
      hallCapacity: '500',
      carParkCapacity: '200',
      facilities: [
        'cctv',
        'media support',
        'projector'
      ],
      price: '100000'
    };
    wrapper = getComponent();
    wrapper.instance().handleUpdateCenter(center);

    expect(wrapper.state().isRequestMade).toEqual(true);
  });

  it('testing handle event booking function', () => {
    const event = {
      eventName: 'test event name',
      days: '2',
      startDate: '2121-12-12',
      centerId: 1,
      image: {
        files: []
      },
      newImage: {
        files: []
      },
    };
    wrapper = getComponent();
    wrapper.instance().handleEventBooking(event);

    expect(wrapper.state().isRequestMade).toEqual(true);
  });
});
describe('Connected Component', () => {
  describe('Connected Centers Component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response,
      });
      wrapper = shallow(<ConnectedCenterDetails store={store} history={history} match={match} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
