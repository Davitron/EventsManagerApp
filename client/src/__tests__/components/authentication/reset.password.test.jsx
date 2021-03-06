import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedResetPassword, { ResetPassword } from '../../../components/authentication/ResetPassword';

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
      history,
      response
    };
    history.push = jest.fn();
    mountedComponent = shallow(<ResetPassword{...props} />);
  }
  return mountedComponent;
};

describe('ResetPassword Component', () => {
  beforeEach(() => {
    testStore = mockStore(initialState);
  });

  it('it should successfully render the component', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('should change state depending on the props the component recieves', () => {
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

  it('should change state depending on the props the component recieves', () => {
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

  it('should change state to value passed into the function', () => {
    wrapper = getComponent();
    const event = { target: { name: 'password', value: 'minerva' } };
    wrapper.instance().onChange(event);
    expect(wrapper.state().user.password).toEqual(event.target.value);
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
        password: ''
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
    expect(history.push).toHaveBeenCalled();
  });
});

describe('Connected Component', () => {
  describe('Connected Logincomponent', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response
      });
      wrapper = shallow(<ConnectedResetPassword store={store} history={history} />);
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
