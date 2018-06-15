import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Paginator from '../../../components/reusables/Paginator';

let mountedComponent;
let props;
let wrapper;

const pagingData = {
  limit: 10,
  offset: 0,
  page: 1,
  pages: 5,
  count: 50,
  currentPageSize: 10
};

const onChange = () => null;
const onShowSizeChange = () => null;

const getComponent = () => {
  if (!mountedComponent) {
    props = {
      pagingData,
      onChange,
      onShowSizeChange
    };
    mountedComponent = shallow(<Paginator {...props} />);
  }
  return mountedComponent;
};

describe('Paginator Component', () => {
  it('should successfully render the component', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });
});
