import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import UserRoute from '../../helpers/user-route';
import CenterEvent from '../../components/event/CenterEvent';

let mountedComponent;
let wrapper;
let props;

/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    props = {
      path: '/pending-events',
      component: CenterEvent,
      redirectPath: '/login',
      exact: true
    };
    mountedComponent = shallow(<UserRoute {...props} />);
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
