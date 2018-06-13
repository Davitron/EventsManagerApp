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
        status: 'created',
        data: 'registration successful'
      }
    };

    wrapper = getComponent();

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(history.push).toHaveBeenCalled();
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
});

describe('Connected Component', () => {
  describe('Connected Register Component', () => {
    it('should render the connected component with all props', () => {
      const store = mockStore({
        response
      });
      wrapper = shallow(<ConnectedRegister store={store} history={history} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
