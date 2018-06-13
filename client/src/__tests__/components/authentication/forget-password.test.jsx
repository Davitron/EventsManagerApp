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

const mockStore = configureStore();
let wrapper;

/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mount
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

describe('ForgotPassword Component', () => {
  beforeEach(() => {});

  it('should successfully render the component', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('should change a state in the component new props comes in from the reducer with a failed status', () => {
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

  it('should change a state in the component new props comes in from the reducer with a success status', () => {
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

  it('should change state when an input filled with a value', () => {
    wrapper = getComponent();
    const event = { target: { name: 'email', value: 'testEmail@email.com' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().user.email).toEqual(event.target.value);
  });

  it('should sumbit a form', () => {
    wrapper = getComponent();
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.instance().onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should change the state of the loader when input is not valid', () => {
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

  it('should change the state of the alert to false when the closeAlert method is called', () => {
    wrapper = getComponent();
    wrapper.instance().closeAlert();
    expect(wrapper.state().showAlert).toBe(false);
  });
});

describe('Connected Component', () => {
  describe('Connected Login component', () => {
    it('should successfully render the component', () => {
      const store = mockStore({
        response
      });
      wrapper = shallow(<ConnectedForgotPassword store={store} />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
