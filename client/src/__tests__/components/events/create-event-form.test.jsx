import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedEventFormModal, { EventFormModal } from '../../../components/event/create-event-form';

jest.mock('../../../helpers/image-upload', () => jest.fn(() => Promise.resolve({})));

let mountedComponent;

let props;
const response = {
  eventUpdate: {
    data: null,
    status: null
  }
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
    mountedComponent = shallow(<EventFormModal {...props} />);
  }
  return mountedComponent;
};

describe('Center Component', () => {
  beforeEach(() => {});

  it('component successfully rendered', () => {
    wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
  });

  it('test component will recieve props', () => {
    const nextProps = {
      open: true,
      errors: {
        eventName: ['Invalid event name'],
        image: ['Invalid image'],
        days: ['days is invalid'],
        stateDate: ['invalid date format'],
      },
      isRequestMade: true,
      event: {
        eventName: 'Test Event',
        image: 'path to Image',
        days: 1,
        startDate: '2010-10-10'
      }
    };

    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(wrapper.state().errors).toEqual(nextProps.errors);
    expect(wrapper.state().loading).toEqual(nextProps.isRequestMade);
    expect(wrapper.state().open).toEqual(nextProps.open);
    expect(wrapper.state().event).toEqual(nextProps.event);
  });

  it('testing on change function', () => {
    const event = {};
    const data = { name: 'eventName', value: 'Test event' };
    wrapper.instance().onChange(event, data);
    expect(wrapper.state().event[data.name]).toEqual(data.value);
  });

  it('testing on change function', () => {
    const event = { target: { name: 'image', files: [{ image: 'test' }] } };
    wrapper.instance().onFileChange(event);
    expect(wrapper.state().event[event.target.name]).toEqual(event.target.files[0]);
  });

  it('testing onSubmit function', () => {
    wrapper.instance().onSubmit();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('testing hideModal function', () => {
    wrapper.setState({
      mode: 'create'
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
      wrapper = shallow(<ConnectedEventFormModal store={store} {...props} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
