import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../components/App';

let mountedComponent;
let wrapper;

/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<App />);
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
});
