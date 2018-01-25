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
  getEvents: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  stateProps: PropTypes.objectOf(() => null),
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
      event: {},
      errors: {},
      loading: false,
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
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
    console.log(nextProps.selectedEvent);
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: {
          id: nextProps.selectedEvent.id,
          eventName: nextProps.selectedEvent.eventName,
          startDate: this.formatDate(nextProps.selectedEvent.startDate),
          days: nextProps.selectedEvent.days.toString(),
          centerId: nextProps.selectedEvent.centerId.toString()
        }
      });
    }
    if (nextProps.stateProps.response.data !== message) {
      console.log(message);
      this.setState({
        message: nextProps.stateProps.response.data
      }, () => {
        if (nextProps.stateProps.response.data) {
          this.setState({
            loading: false
          });
          Materialize.toast(nextProps.stateProps.response.data, 6000, 'cyan');
          setTimeout(() => $('#updateEvent').modal('close'), 6000);
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
  *@param {*} e
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onDateChange(e) {
    const { name, value } = e.target;
    const date = this.formatDateBack(value);
    console.log(date);
    const { event } = this.state;
    this.setState({
      event: {
        ...event,
        [name]: date
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
    // console.log(this.state.event);
    // if (this.isValid() === true) {
    this.setState({
      loading: true
    });
    const { updateEvent } = this.props;
    updateEvent(this.state.event);
    // }
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
  *@param {*} date
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  formatDate = (date) => {
    const startDate = date.split('T');
    return startDate[0];
  }

  /**
  *@param {*} date
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  formatDateBack = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  }

  /**
   *@returns {*} renders the modal
   */
  render() {
    const { event, errors, loading } = this.state;
    return (
      <div className="event-modal">
        <div id="updateEvent" className="modal modal-fixed-footer">

          <div className="modal-content">
            <h4>Create Event</h4>
            {loading === true && <Loader />}
            <div className="row">
              <form className={['col', 'row', 's12'].join(' ')} >
                <div className={['row'].join(' ')}>
                  <Input
                    s={12}
                    name="eventName"
                    value={!event.eventName ? '' : event.eventName}
                    onChange={this.onChange}
                    label="Event Name"
                    labelClassName={event.eventName && 'active'}
                  />
                </div>
                <Row>
                  <Input
                    s={12}
                    name="startDate"
                    value={!event.startDate ? '' : event.startDate}
                    type="date"
                    onChange={this.onDateChange}
                    label="Start Date"
                    labelClassName={event.startDate && 'active'}
                  />
                </Row>
                <Row>
                  <Input
                    s={12}
                    name="days"
                    type="number"
                    value={!event.days ? '' : event.days}
                    onChange={this.onChange}
                    label="Days"
                    labelClassName={event.days && 'active'}
                  />
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
