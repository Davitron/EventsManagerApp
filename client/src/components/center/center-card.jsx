import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CenterCard = ({ center }) => (
  <Card>
    <Image src="http://res.cloudinary.com/eventsmanager/image/upload/v1523025087/llrqzelqzeqxfm6kmv3u.jpg" />
    <Card.Content>
      <Card.Header>
        {center.name}
      </Card.Header>
      <Card.Meta>
        <span className="date">
          <Icon name="users" />
          {center.hallCapacity}
        </span>
      </Card.Meta>
      <Card.Description>
        {center.address} {center.State.stateName}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Link to={`/centers/${center.id}`}>
        <Icon name="browser" />
        View this center
      </Link>
    </Card.Content>
  </Card>
);

CenterCard.propTypes = {
  center: PropTypes.objectOf(() => null)
};

CenterCard.defaultProps = {
  center: {}
};

export default CenterCard;

