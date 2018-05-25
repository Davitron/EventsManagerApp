import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import EventCard from '../../../components/event/event-card';

let mountedComponent;
const dispatch = fn => fn;

let props;
const locations = [];
const history = {
  push(location) {
    locations.push(location);
  },
};

const eventObj = {
  eventName: 'Test Arena',
  centerId: 2,
  days: '2',
  image: {
    files: []
  },
  status: 'pending',
  Center: {
    name: 'test center'
  },
  startDate: '2018-12-12'
};

const updateEvent = jest.fn();
const deleteEvent = id => id;


const location = {};

let wrapper;

/**
 * @description Initialise the component
 *
 * @param {object} event
 * @param {string} mode
 * @returns {object} mountedComponent - Mounte
 */
const getComponent = (event, mode) => {
  if (!mountedComponent) {
    props = {
      dispatch,
      history,
      location,
      onPositive: updateEvent,
      onNegative: deleteEvent,
      mode,
      event
    };
    history.push = jest.fn();
    mountedComponent = shallow(<EventCard {...props} />);
  }
  return mountedComponent;
};
describe('Event Component', () => {
  beforeAll(() => {
  });


  it('component successfully rendered', () => {
    wrapper = getComponent(eventObj, 'Accept');
    expect(wrapper).toMatchSnapshot();
  });

  it('testing get color function', () => {
    const newEvent = {
      ...eventObj,
      status: 'cancelled'
    };
    const card = getComponent(newEvent).find(Card);
    expect(card.length).toBe(1);
  });
});

