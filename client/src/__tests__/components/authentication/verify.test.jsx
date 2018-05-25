import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import VerifyEmail from '../../../components/authentication/verify';

let mountedComponent;

let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

let wrapper;


/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    props = {};
    history.push = jest.fn();
    mountedComponent = shallow(<VerifyEmail {...props} />);
  }
  return mountedComponent;
};

describe('Verified Component', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });
});
