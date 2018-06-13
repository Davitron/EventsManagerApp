import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

let mountedComponent;
let wrapper;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<NotFound />);
  }
  return mountedComponent;
};

describe('NotFound Component Test', () => {
  beforeAll(() => {
    wrapper = getComponent();
  });

  it('component successfully rendered', () => {
    const divs = wrapper.find('div');
    expect(divs.length).toBe(2);
  });

  it('component successfully rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
