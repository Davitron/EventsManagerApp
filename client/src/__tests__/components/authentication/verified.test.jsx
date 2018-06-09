import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedVerifiedEmail, { VerifiedEmail } from '../../../components/authentication/VerifiedEmail';

let mountedComponent;

let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

const dispatch = fn => fn;

const stateProps = {
  isAuthenticated: false,
  status: null,
  data: null
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
      dispatch,
      stateProps
    };
    history.push = jest.fn();
    mountedComponent = shallow(<VerifiedEmail {...props} />);
  }
  return mountedComponent;
};

describe('Verified Component', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      stateProps: {
        status: 'failed',
        data: 'error in registration'
      }
    };

    wrapper = getComponent();

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().message).toEqual(nextProps.stateProps.data);
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      stateProps: {
        status: 'failed',
        data: 'error in registration'
      }
    };

    wrapper = getComponent();
    wrapper.setProps({
      stateProps: {}
    });
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().message).toEqual(nextProps.stateProps.data);
  });
});

describe('Connected Component', () => {
  describe('Connected VerifiedEmail component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        stateProps
      });
      wrapper = shallow(<ConnectedVerifiedEmail store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
