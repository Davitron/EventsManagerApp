import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedForgotPassword, { ForgotPassword } from '../../../components/authentication/ForgotPassword';

let mountedComponent;

let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};


const response = {
  isAuthenticated: false,
  status: null,
  data: null
};

const initialState = {};

const mockStore = configureStore();
let wrapper;
let testStore; //eslint-disable-line

/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    props = {
      response
    };
    history.push = jest.fn();
    mountedComponent = shallow(<ForgotPassword{...props} />);
  }
  return mountedComponent;
};

describe('Register Component', () => {
  beforeEach(() => {
    testStore = mockStore(initialState);
  });

  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      response: {
        status: 'failed',
        data: 'error in registration'
      }
    };

    wrapper = getComponent();

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().serverError).toEqual(nextProps.response.data);
  });

  it('testing component will recieve props with a different props', () => {
    const nextProps = {
      response: {
        status: 'success',
        data: 'request successfull'
      }
    };

    wrapper = getComponent();

    wrapper.setState({
      serverError: null
    });

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().serverSuccess).toEqual(nextProps.response.data);
  });

  it('testing on change function', () => {
    wrapper = getComponent();
    const event = { target: { name: 'email', value: 'testEmail@email.com' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().user.email).toEqual(event.target.value);
  });

  it('testing on onSubmit function', () => {
    wrapper = getComponent();
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.instance().onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('testing on onSubmit function', () => {
    wrapper = getComponent();
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.setState({
      user: {
        email: ''
      }
    });
    wrapper.instance().onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(wrapper.state().isLoading).toBe(false);
  });

  it('testing for closeAlert function', () => {
    wrapper = getComponent();
    wrapper.instance().closeAlert();
    expect(wrapper.state().showAlert).toBe(false);
  });
});

describe('Connected Component', () => {
  describe('Connected Logincomponent', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response
      });
      wrapper = shallow(<ConnectedForgotPassword store={store} />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
