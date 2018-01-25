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
window.jQuery = window.$ = jQuery;


const propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  createEvent: PropTypes.func.isRequired,
  centerId: PropTypes.number
};

const defaultProps = {
  stateProps: {},
  centerId: undefined
};
/**
 *component for create event modal
 */
class CreateEventModal extends Component {
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
        days: ''
      },
      errors: {},
      loading: false,
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    console.log(this.props.centerId);
  }

  /**
   * @param {object} nextProps
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const { message } = this.state;
    if (nextProps.stateProps.response.data !== message && nextProps.stateProps.response) {
      this.setState({
        message: nextProps.stateProps.response.data
      }, () => {
        if (nextProps.stateProps.response.data) {
          this.setState({
            loading: false,
            event: {
              eventName: '',
              startDate: '',
              days: '',
              centerId: '',
            }
          });
          Materialize.toast(nextProps.stateProps.response.data, 6000, 'cyan');
          setTimeout(() => $('#newEvent').modal('close'), 6000);
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
    const date = this.formatDate(value);
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
   * @param {*} e`
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(e) {
    console.log(this.props.centerId);
    const { event } = this.state;
    const { createEvent } = this.props;
    e.preventDefault();
    this.setState({
      loading: true,
      event: {
        ...event,
        centerId: this.props.centerId.toString()
      }
    }, () => {
      createEvent(this.state.event);
    });
  }

  /**
  *@param {*} date
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
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
                  <Input s={12} name="startDate" value={event.startDate} type="date" onChange={this.onDateChange} label="Start Date" />
                </Row>
                <Row>
                  <Input s={12} name="days" type="number" value={event.days} onChange={this.onChange} label="Days" />
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

CreateEventModal.propTypes = propTypes;
CreateEventModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.createEvent
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createEvent: eventAction.createEvent,
  getEvents: eventAction.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(CreateEventModal);
