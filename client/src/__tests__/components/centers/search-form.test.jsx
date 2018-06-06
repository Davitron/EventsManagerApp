import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SearchForm from '../../../components/center/SearchForm';

let mountedComponent;
let wrapper;

let props;

let onSearch = event => event;
onSearch = jest.fn();

// const document = {
//   getElementById: (id) => { id, focus: jest.fn() }
// };


const getComponent = () => {
  if (!mountedComponent) {
    props = {
      onSearch
    };
    mountedComponent = shallow(<SearchForm {...props} />);
  }
  return mountedComponent;
};

describe('Search Component', () => {
  beforeAll(() => {
    wrapper = getComponent();
  });

  it('component successfully rendered', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    const nextProps = {
      states: [
        { id: 1, stateName: 'Abia' },
        { id: 2, stateName: 'Ogun' },
        { id: 3, stateName: 'FCT' }
      ]
    };

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().states.length).toEqual(nextProps.states.length + 1);
  });

  it('testing on change function', () => {
    const data = { name: 'search', value: 'test' };
    const event = { name: 'search', value: 'test' };
    wrapper.instance().onChange(event, data);
    expect(wrapper.state().query[data.name]).toEqual(data.value);
  });

  it('testing on onSubmit function', () => {
    wrapper = getComponent();
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.setState({
      query: {
        state: null
      }
    });
    wrapper.instance().onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalled();
  });

  it('testing on renderLabel function', () => {
    const event = { preventDefault: () => undefined };
    event.preventDefault = jest.fn();
    wrapper.instance().onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalled();
  });

  it('testing renderLabel function', () => {
    const param = { key: 1, text: 'hello' };
    const label = wrapper.instance().renderLabel(param);
    expect(label.color).toEqual('blue');
    expect(label.content).toEqual(param.text);
    expect(label.icon).toEqual('check');
  });
});
