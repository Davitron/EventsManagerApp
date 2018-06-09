import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Confirm = ({
  open,
  message,
  onCancel,
  onConfirm,
  isRequestMade,
  title
}) => (
  <Modal dimmer="blurring" open={open} basic size="small">
    <Header icon="archive" content={title} />
    <Modal.Content>
      <p>{message}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color="red" inverted onClick={onCancel}>
        <Icon name="remove" /> No
      </Button>
      <Button color="blue" inverted onClick={onConfirm} loading={isRequestMade}>
        <Icon name="checkmark" /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  isRequestMade: PropTypes.bool.isRequired
};

Confirm.defaultProps = {
  message: '',
  title: '',
};

export default Confirm;

