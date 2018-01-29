import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import EventActions from '../../../actions/event.action';
import Loader from './../Loader/Loader';

const eventAction = new EventActions();


const propTypes = {
  eventId: PropTypes.number,
  centerId: PropTypes.string,
  approveEvent: PropTypes.func.isRequired,
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
class ApproveEventModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      eventId: undefined,
      centerId: undefined,
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
      eventId: this.props.eventId,
      centerId: this.props.centerId
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
          $('#approveEvent').modal('close');
          getEvents(this.state.centerId);
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
    const { approveEvent } = this.props;
    approveEvent(this.state.eventId);
  }

  /**
   * @returns {*} view fir approve prompt
   */
  render() {
    const { loading } = this.state;
    return (
      <div id="approveEvent" className="modal">
        <div className="modal-content">
          {loading === true && <Loader />}
          <h4>Approve Event</h4>
          <h5>Are you sure you want to approve this event?</h5>
        </div>
        <div className="modal-footer">
          <button className="waves-effect waves-green btn" onClick={this.onSubmit}>Confirm</button>
        </div>
      </div>
    );
  }
}

ApproveEventModal.propTypes = propTypes;
ApproveEventModal.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.approveEvent
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  approveEvent: eventAction.approveEvent,
  getEvents: eventAction.getPendingEvent
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(ApproveEventModal);
