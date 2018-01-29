import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row } from 'react-materialize';
import PropTypes from 'prop-types';
import EventActions from '../../../actions/event.action';
import Loader from './../Loader/Loader';

const eventAction = new EventActions();


const propTypes = {
  eventId: PropTypes.number,
  centerId: PropTypes.string,
  rejectEvent: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  stateProps: PropTypes.objectOf(() => {
    return null;
  }),
};

const defaultProps = {
  eventId: undefined,
  centerId: undefined,
  stateProps: {}
};
/**
  *
  */
class RejectEventModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      event: {
        eventId: undefined,
        centerId: undefined,
      },
      eventDate: '',
      loading: false,
      message: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  /**
   * @returns {*} set value of props to event on initial render
   */
  componentWillMount() {
    this.setState({
      event: {
        eventId: this.props.eventId,
        centerId: this.props.centerId
      }
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
    const { response } = nextProps.stateProps;
    if (nextProps.eventId !== this.props.eventId) {
      console.log(nextProps.eventId);
      this.setState({
        event: {
          eventId: nextProps.eventId,
          centerId: nextProps.centerId
        }
      });
    }

    if (response.data !== message) {
      this.setState({
        message: response.data
      }, () => {
        if (response.data) {
          this.setState({
            loading: false
          });
          $('#rejectEvent').modal('close');
          getEvents(this.state.event.centerId);
        }
      });
    } else if (response.error) {
      this.setState({
        loading: false,
        message: response.error
      });
    }
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
      eventDate: date
    });
  }

  /**
   *
   * @param {*} event
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { rejectEvent } = this.props;
    const eventObj = {
      eventDate: this.state.eventDate,
      id: this.state.event.eventId
    };
    rejectEvent(eventObj);
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
   * @returns {*} view fir reject prompt
   */
  render() {
    const { loading, eventDate } = this.state;
    return (
      <div id="rejectEvent" className="modal modal-fixed-footer">
        <div className="modal-content">
          {loading === true && <Loader />}
          <h4>Reject Event</h4>
          <h5>You are about to cancel this event. This action is irreversible </h5>
          <Row>
            <Input s={12} name="eventDate" value={eventDate} type="date" onChange={this.onDateChange} label="Suggest Date" />
          </Row>
        </div>
        <div className="modal-footer">
          <button className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</button>
          <button className="waves-effect waves-green btn-flat" onClick={this.onSubmit}>Confirm</button>
        </div>
      </div>
    );
  }
}

RejectEventModal.propTypes = propTypes;
RejectEventModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.rejectEvent
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  rejectEvent: eventAction.rejectEvent,
  getEvents: eventAction.getPendingEvent
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(RejectEventModal);
