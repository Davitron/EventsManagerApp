import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row } from 'react-materialize';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import EventActions from '../../../actions/event.action';
import Loader from './../Loader/Loader';
import FormValidator from '../forms/formInputValidator';


const eventAction = new EventActions();

const propTypes = {
  selectedEvent: PropTypes.objectOf(() => null),
  updateEvent: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  centerId: PropTypes.number.isRequired,
  stateProps: PropTypes.objectOf(() => {
    return null;
  }),
};

const defaultProps = {
  selectedEvent: {},
  stateProps: {}
};
/**
 *component for create event modal
 */
class UpdateEventModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      event: {
        eventName: '',
        startDate: '',
        days: '',
        centerId: ''
      },
      errors: {},
      loading: false,
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @returns {*} set value of props to event on initial render
   */
  componentWillMount() {
    this.setState({
      event: this.props.selectedEvent
    });
  }

  /**
   *
   * @param {*} nextProps
   * @returns {*} to set state when props changes
   */
  componentWillReceiveProps(nextProps) {
    const { message } = this.state;
    const { getEvents } = this.props;
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: {
          id: nextProps.selectedEvent.id,
          eventName: nextProps.selectedEvent.eventName,
          startDate: nextProps.selectedEvent.startDate,
          days: nextProps.selectedEvent.days,
          centerId: nextProps.selectedEvent.centerId
        }
      });
    }
    if (nextProps.stateProps.response.data !== message) {
      this.setState({
        message: nextProps.stateProps.response.data
      }, () => {
        if (nextProps.stateProps.response.data) {
          this.setState({
            loading: false
          });
          Materialize.toast(nextProps.stateProps.response.data, 6000, 'cyan');
          setTimeout(() =>  $('#updateEvent').modal('close'), 6000);
          getEvents();
        }
      });
    }
  }

  /**
  *@param {*} e
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onChange(e) {
    const { name, value } = e.target;
    const { event } = this.state;
    this.setState({
      event: {
        ...event,
        [name]: value
      }
    });
  }


  /**
   *
   * @param {*} e
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.event);
    if (this.isValid() === true) {
      this.setState({
        loading: true
      });
      const { updateEvent } = this.props;
      updateEvent(this.state.event);
    }
  }

  /**
   *@returns {*} check if form imputs are valid
   */
  isValid() {
    let validity = true;
    const formValidator = new FormValidator();
    const { errors, isValid } = formValidator.validateEventInput(this.state.event);
    if (isValid === false) {
      this.setState({ errors });
      validity = false;
      return validity;
    }
    return validity;
  }
  /**
   *@returns {*} renders the modal
   */
  render() {
    const { event, errors, loading } = this.state;
    return (
      <div className="event-modal">
        <div id="newEvent" className="modal modal-fixed-footer">

          <div className="modal-content">
            <h4>Create Event</h4>
            {loading === true && <Loader />}
            <div className="row">
              <form className={['col', 'row', 's12'].join(' ')} >
                <div className={['row'].join(' ')}>
                  <Input s={12} name="eventName" value={event.eventName} onChange={this.onChange} label="Event Name" />
                </div>
                <Row>
                  <Input name="startDate" value={event.startDate} type="date" onChange={this.onChange} label="Start Date" />
                </Row>
                <Row>
                  <Input s={6} name="days" type="number" value={event.eventName} onChange={this.onChange} label="Days" />
                </Row>
              </form>
            </div>
          </div>
          <div className="modal-footer" >
            <button className="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</button>
            <button className="waves-effect waves-green btn-flat" onClick={this.onSubmit}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

UpdateEventModal.propTypes = propTypes;
UpdateEventModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.updateEvent
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateEvent: eventAction.updateEvent,
  getEvents: eventAction.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(UpdateEventModal);
