import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedRegister, { Register } from '../../../components/authentication/Register';

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
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    props = {
      history,
      response
    };
    history.push = jest.fn();
    mountedComponent = shallow(<Register {...props} />);
  }
  return mountedComponent;
};

describe('Register Component', () => {
  beforeEach(() => {});

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
        status: 'created',
        data: 'registration successful'
      }
    };

    wrapper = getComponent();

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(history.push).toHaveBeenCalled();
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
});

describe('Connected Component', () => {
  describe('Connected Registercomponent', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response
      });
      wrapper = shallow(<ConnectedRegister store={store} history={history} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
