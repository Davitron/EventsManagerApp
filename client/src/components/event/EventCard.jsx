import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Image, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const getColor = (status) => {
  if (status === 'pending') return 'orange';
  if (status === 'cancelled') return 'red';
  if (status === 'accepted') return 'teal';
};

const handleDuration = (sDate, eDate) => {
  sDate = moment(sDate).format('MMMM Do YYYY');
  eDate = moment(eDate).format('MMMM Do YYYY');
  if (sDate === eDate) {
    return sDate;
  }
  return `${sDate} - ${eDate}`;
};

const EventCard = ({
  event,
  mode,
  onPositive,
  onNegative
}) => (
  <Card>
    <Image src={event.image} />
    <Card.Content>
      <Label color={getColor(event.status)} ribbon="right">{event.status}</Label>
      <Card.Header>{event.eventName}</Card.Header>
      <Card.Meta>{handleDuration(event.startDate, event.endDate)}</Card.Meta>
      <Card.Description><Link to={`/centers/${event.centerId}`}>{event.center.name}</Link></Card.Description>
    </Card.Content>
    <Card.Content extra>
      {
        (onNegative && onPositive) &&
        <div className="ui two buttons">
          <Button basic onClick={onPositive} color="green">{ mode ? 'Accept' : 'Update' }</Button>
          <Button basic onClick={onNegative} color="red">{ mode ? 'Decline' : 'Delete' }</Button>
        </div>
      }
    </Card.Content>
  </Card>
);

EventCard.propTypes = {
  event: PropTypes.objectOf(() => null).isRequired,
  mode: PropTypes.string,
  onPositive: PropTypes.func,
  onNegative: PropTypes.func
};

EventCard.defaultProps = {
  onPositive: null,
  onNegative: null,
  mode: null
};

export default EventCard;
