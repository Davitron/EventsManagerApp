import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedCenterFormModal, { CenterFormModal } from '../../../components/center/create-center-form';

jest.mock('../../../helpers/image-upload', () => jest.fn(() => Promise.resolve({})));

let mountedComponent;

let props;
const response = {
  data: null,
  status: null
};


let onSubmit = center => center;
onSubmit = jest.fn();

const open = false;
let hideModal = () => true;
hideModal = jest.fn();


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
      response,
      onSubmit,
      hideModal,
      open,
      errors: {}
    };
    mountedComponent = shallow(<CenterFormModal {...props} />);
  }
  return mountedComponent;
};

describe('Center Component', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('testing component will recieve props', () => {
    wrapper.setState({
      open: false,
      states: [],
      errors: {}
    });
    const nextProps = {
      open: true,
      states: [
        { id: 1, stateName: 'Abia' },
        { id: 2, stateName: 'Lagos', },
        { id: 3, stateName: 'Ogun', },
      ],
      errors: {
        name: ['name is invalid'],
        image: ['image is invalid'],
        facilities: ['facilities are invalid'],
        price: ['price is invalid'],
        hallCapacity: ['hall capacity is invalid'],
        carParkCapacity: ['car park capacity is invalid'],
        stateId: ['invalid item selected']
      },
      center: {
        name: 'Test Arena',
        stateId: 2,
        address: 'This is a test address for this event center',
        image: {
          files: []
        },
        hallCapacity: '500',
        carParkCapacity: '200',
        facilities: [
          'cctv',
          'media support',
          'projector'
        ],
        price: '100000'
      }
    };

    wrapper = getComponent();
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().open).toEqual(nextProps.open);
  });

  it('testing on change function', () => {
    wrapper = getComponent();
    const event = { target: { name: 'name', value: 'Test Center' } };
    const data = { name: 'name', value: 'Test Center' };
    wrapper.instance().onChange(event, data);
    expect(wrapper.state().center[data.name]).toEqual(data.value);
  });

  it('testing on change function', () => {
    wrapper = getComponent();
    const event = { target: { name: 'image', files: [{ image: 'test' }] } };
    wrapper.instance().onFileChange(event);
    expect(wrapper.state().center[event.target.name]).toEqual(event.target.files[0]);
  });

  it('testing onSubmit function', () => {
    wrapper = getComponent();
    wrapper.instance().onSubmit();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('testing hideModal function', () => {
    wrapper = getComponent();
    wrapper.setState({
      mode: 'create'
    });
    wrapper.instance().hideModal();
    expect(wrapper.state().center).toEqual({});
  });

  it('testing hideModal function', () => {
    wrapper = getComponent();
    wrapper.setState({
      mode: 'update'
    });
    wrapper.instance().hideModal();
    expect(hideModal).toHaveBeenCalled();
  });
});

describe('Connected Component', () => {
  describe('Connected Centers Component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        response,
      });
      props = {
        response,
        onSubmit,
        hideModal,
        open,
        errors: {}
      };
      wrapper = shallow(<ConnectedCenterFormModal store={store} {...props} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
