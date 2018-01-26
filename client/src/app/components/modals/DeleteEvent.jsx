import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import EventActions from '../../../actions/event.action';
import Loader from './../Loader/Loader';

const eventAction = new EventActions();


const propTypes = {
  eventId: PropTypes.number,
  deleteEvent: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  stateProps: PropTypes.objectOf(() => {
    return null;
  }),
};

const defaultProps = {
  eventId: undefined,
  stateProps: {}
};
/**
  *
  */
class DeleteEventModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      eventId: undefined,
      loading: false,
      message: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @returns {*} set value of props to event on initial render
   */
  componentWillMount() {
    this.setState({
      eventId: this.props.eventId
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
        eventId: nextProps.eventId
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
          Materialize.toast(response.data, 6000, 'cyan');
          $('#deleteEvent').modal('close')
          getEvents();
        }
      });
    } else if (response.error) {
      this.setState({
        loading: false,
        message: response.error
      }, () => {
        Materialize.toast(this.state.message, 4000, 'red');
      });
    }
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
    const { deleteEvent } = this.props;
    deleteEvent(this.state.eventId);
  }

  /**
   * @returns {*} view fir delete prompt
   */
  render() {
    const { loading } = this.state;
    return (
      <div id="deleteEvent" className="modal">
        <div className="modal-content">
          {loading === true && <Loader />}
          <h4>Delete Event</h4>
          <h5>Are you sure you want to delete this event?</h5>
        </div>
        <div className="modal-footer">
          <button className="waves-effect waves-green btn" onClick={this.onSubmit}>Confirm</button>
        </div>
      </div>
    );
  }
}

DeleteEventModal.propTypes = propTypes;
DeleteEventModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.deleteEvent
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteEvent: eventAction.deleteEvent,
  getEvents: eventAction.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(DeleteEventModal);
