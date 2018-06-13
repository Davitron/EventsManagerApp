import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Input, Button } from 'semantic-ui-react';
import Home from '../../components/Home';

let mountedComponent;


const home = new Home();
home.onSearch = jest.fn();

const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};
/**
 * @description Initialise the component
 *
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = () => {
  if (!mountedComponent) {
    history.push = jest.fn();
    mountedComponent = shallow(<Home history={history} />);
  }
  return mountedComponent;
};

describe('Header Test', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    const divs = getComponent().find('div');
    expect(divs.length).toBe(5);
  });

  it('It should call the history props function when search button is clicked ', () => {
    const wrapper = getComponent();
    wrapper.setState({ search: 'test' });

    const button = wrapper.find(Button);
    button.simulate('click');
    expect(history.push).toHaveBeenCalled();
  });

  it('It should call onChange function and setState when user starts to type in search input ', () => {
    const wrapper = getComponent();
    const event = { target: { name: 'search', value: 'test' } };
    const input = wrapper.find(Input);
    input.simulate('change', event);
    expect(wrapper.state().search).toEqual(event.target.value);
  });
});
