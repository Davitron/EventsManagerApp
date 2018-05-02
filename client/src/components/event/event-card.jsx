import React from 'react';
import moment from 'moment';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const getColor = (status) => {
  if (status === 'pending') return 'orange';
  if (status === 'canceled') return 'red';
  if (status === 'accepted') return 'teal';
};

const EventCard = ({
  event
}) => (
  <Card>
    <Image src={event.image} />
    <Card.Content>
      <Label as="a" color={getColor(event.status)} ribbon="right">{event.status}</Label>
      <Card.Header>{event.eventName}</Card.Header>
      <Card.Meta>{moment(event.startDate).format('MMMM Do YYYY')} - {moment(event.endDate).format('MMMM Do YYYY')}</Card.Meta>
      <Card.Description>{event.Center.name}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green">Update</Button>
        <Button basic color="red">Delete</Button>
      </div>
    </Card.Content>
  </Card>
);

EventCard.propTypes = {
  event: PropTypes.objectOf(() => null).isRequired
};

export default EventCard;
