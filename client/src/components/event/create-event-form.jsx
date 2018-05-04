import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Modal, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import EventActions from '../../actions/event-action';

const propTypes = {
  response: PropTypes.objectOf(() => null), // eslint-disable-line
  onSubmit: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  event: PropTypes.objectOf(() => null),
  errors: PropTypes.objectOf(() => null).isRequired,
  open: PropTypes.bool.isRequired,
  isRequestMade: PropTypes.bool
};

const defaultProps = {
  response: {},
  event: {},
  isRequestMade: false
};

  /**
  *@param {*} date
  *@returns {*}
  *this handles the event when any property in the state changes
  */
const formatDate = (date) => {
  const startDate = date.split('T');
  return startDate[0];
};


/**
 *component for create event modal
 */
class EventFormModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      errors: {},
      loading: false,
      open: false,
      mode: 'create'
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /**
   * @param {object} nextProps
   *
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const {
      open,
      event,
      errors,
      isRequestMade
    } = nextProps;

    if (errors !== this.props.errors) {
      this.setState({ errors });
    }

    if (open !== this.props.open) {
      this.setState({ open });
    }

    if (event !== this.props.event) {
      this.setState({ event, mode: 'update' });
    }

    if (isRequestMade !== this.props.isRequestMade) {
      this.setState({ loading: isRequestMade });
    }
  }


  /**
  * @param {object} e
  *
  * @param {object} data
  *
  * @returns {void}
  *
  *this handles the event when any property in the state changes
  */
  onChange(e, data) {
    const { name, value } = data;
    const { event } = this.state;
    this.setState({
      event: {
        ...event,
        [name]: value
      }
    });
  }

  /**
  * @param {*} e
  *
  * @returns {*}
  *this handles the event when any property in the state changes
  */
  onFileChange(e) {
    const { name, files } = e.target;

    const { event } = this.state;
    this.setState({
      event: {
        ...event,
        [name]: files[0]
      }
    });
  }


  /**
   * @returns {void}
   */
  onSubmit() {
    this.props.onSubmit(this.state.event);
  }

  /**
   * @returns {void}
   */
  hideModal() {
    const { mode } = this.state;
    if (mode !== 'update') {
      this.setState({ event: {} });
    }
    this.props.hideModal();
  }

  /**
   *@returns {*} renders the modal
   */
  render() {
    const {
      event,
      errors,
      loading,
      open,
      mode
    } = this.state;
    return (
      <div>
        <Modal dimmer="blurring" size="mini" open={open} onClose={this.close}>
          <Modal.Header>
            {mode === 'create' ? 'Create Event' : 'Update Event' }
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  error={errors.eventName ? true : false}
                  defaultValue={event.eventName ? event.eventName : ''}
                  label={errors.eventName ? errors.eventName[0] : 'Event Name'}
                  placeholder="Event name"
                  onChange={this.onChange}
                  name="eventName"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="number"
                  fluid
                  error={errors.days ? true : false}
                  defaultValue={event.days ? event.days.toString() : ''}
                  label={errors.days ? errors.days[0] : 'days'}
                  placeholder="Amount of days"
                  onChange={this.onChange}
                  name="days"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="date"
                  fluid
                  error={errors.startDate ? true : false}
                  defaultValue={event.startDate ? formatDate(event.startDate) : ''}
                  label={errors.startDate ? errors.startDate[0] : 'Date'}
                  onChange={this.onChange}
                  name="startDate"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <div className="field">
                  <label style={errors.image && { color: '#9f3a38' }}>{errors.image ? errors.image[0] : 'Image'}</label>
                  <div className="ui field input">
                    <input type="file" accept="image/*" label="Image" placeholder="Upload an Image" onChange={this.onFileChange} name={event.image ? 'newImage' : 'image'} />
                  </div>
                </div>
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.hideModal}>
              Cancel
            </Button>
            <Button
              primary
              icon="checkmark"
              disabled={loading}
              loading={loading}
              labelPosition="right"
              content={mode === 'create' ? 'create' : 'update'}
              onClick={this.onSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

EventFormModal.propTypes = propTypes;
EventFormModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  response: {
    eventUpate: state.upate,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateEvent: EventActions.updateEvent,
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(EventFormModal);
