import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedCenter, { Center } from '../../../components/center/centers';

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

const createCenter = jest.fn();

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
      createCenter
    };
    history.push = jest.fn();
    mountedComponent = shallow(<Center {...props} />);
  }
  return mountedComponent;
};

describe('Center Component', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      response: {
        ...response,
        centers: {
          status: 'failed',
          data: {
            message: 'Error when fetching',
            data: null
          }
        },
        newCenter: {
          status: 'success',
          data: {
            name: 'new center',
            address: 'a test adress for test'
          }
        }
      },
      location: {
        search: '/centers'
      }
    };

    wrapper = getComponent();

    const centersResponse = nextProps.response.centers;
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().serverError).toEqual(centersResponse.data.message);
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().isRequestMade).toEqual(false);
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      response: {
        ...response,
        centers: {
          status: 'success',
          data: {
            message: 'Centers Retrieved',
            data: [
              {
                id: 1,
                name: 'new center',
                address: 'a test adress for test'
              },
              {
                id: 2,
                name: 'new center2',
                address: 'a test adress for test in another place'
              }
            ],
            metadata: {
              pagination: {
                page: 1,
                total: 10,
                limit: 2,
                offset: 0
              }
            }
          }
        },
        newCenter: {
          status: 'success',
          data: {
            name: 'new center',
            address: 'a test adress for test'
          }
        },
        allStates: {
          status: 'success',
          data: [
            {
              id: 1,
              stateName: 'abia'
            },
            {
              id: 2,
              stateName: 'imo'
            }
          ]
        }
      },
      location: {
        search: '/centers'
      }
    };

    wrapper = getComponent();

    const centersResponse = nextProps.response.centers;
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().serverError).toEqual(null);
    expect(wrapper.state().data).toEqual(centersResponse.data.data);
    expect(wrapper.state().loading).toEqual(false);
    expect(wrapper.state().pagingData).toEqual(centersResponse.data.metadata.pagination);
    expect(wrapper.state().states).toEqual(nextProps.response.allStates.data);
  });

  it('testing on page change function', () => {
    wrapper = getComponent();
    wrapper.instance().onChangePage(1);
    expect(history.push).toHaveBeenCalled();
  });

  it('testing on page size change function', () => {
    wrapper = getComponent();
    wrapper.instance().onPageSizeChange(1, 9);
    expect(history.push).toHaveBeenCalled();
  });

  it('testing on on search function', () => {
    wrapper = getComponent();
    wrapper.instance().onSearch({ page: 1, limit: 9 });
    expect(history.push).toHaveBeenCalled();
  });

  it('testing on onSubmit function', () => {
    wrapper = getComponent();
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.instance().onSubmit(event);
    expect(wrapper.state().isRequestMade).toEqual(false);
  });

  it('testing on onSubmit function', () => {
    wrapper = getComponent();
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.instance().onSubmit();
    expect(wrapper.state().isRequestMade).toEqual(false);
  });


  it('testing on onSubmit function', () => {
    const center = {
      name: 'Test Arena',
      stateId: 2,
      address: 'This is a test address for this event center',
      image: {
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
    wrapper.instance().onSubmit(center);
    expect(wrapper.state().openModal).toEqual(false);
    expect(wrapper.state().isRequestMade).toEqual(true);
  });

  it('testing on open modal function', () => {
    wrapper = getComponent();
    wrapper.instance().showModal();
    wrapper.setState({
      role: 'admin'
    });
    expect(wrapper.state().openModal).toEqual(true);
  });

  it('testing on hide modal function', () => {
    wrapper = getComponent();
    wrapper.instance().hideModal();
    expect(wrapper.state().openModal).toEqual(false);
  });
});

describe('Connected Component', () => {
  describe('Connected Centers Component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response,
      });
      wrapper = shallow(<ConnectedCenter store={store} history={history} location={location} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
