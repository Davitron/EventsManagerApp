import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row } from 'react-materialize';
import PropTypes from 'prop-types';
import EventActions from '../../actions/event-action';
import Header from '../header';
import history from '../../helpers/history';
import FormValidator from '../../helpers/form-validator';
import Toast from '../../helpers/toast';
import Loader from '../reusables/loader';


const eventAction = new EventActions();

const propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  createEvent: PropTypes.func.isRequired,
  centerId: PropTypes.number,
  location: PropTypes.objectOf(() => null).isRequired
};

const defaultProps = {
  stateProps: {},
  centerId: undefined
};
/**
 *component for create event modal
 */
class CreateEventForm extends Component {
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
    this.goBack = this.goBack.bind(this);
  }

  /**
   * @param {object} nextProps
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const { message } = this.state;
    const { response } = nextProps.stateProps;
    if (response.data !== this.props.stateProps.response.data && response) {
      this.setState({
        message: response.data
      }, () => {
        if (response.status === 'success') {
          this.setState({
            loading: false,
            event: {
              eventName: '',
              startDate: '',
              days: '',
              centerId: '',
            }
          });
          history.push('/events');
        }
      });
    } else if (response.error) {
      this.setState({
        loading: false
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
    e.preventDefault();
    this.setState({ loading: true });
    const { event } = this.state;
    console.log(event);
    const fv = new FormValidator();
    const { createEvent } = this.props;
    const errors = fv.validateEventForm(event);
    if (errors) {
      this.setState({
        errors
      }, () => {
        this.setState({ loading: false });
        const message = Object.values(this.state.errors).join('\n');
        Toast.error(message);
      });
    } else {
      this.setState({
        loading: true,
        event: {
          ...event,
          centerId: this.props.location.state.centerId.toString()
        }
      }, () => {
        createEvent(this.state.event);
      });
    }
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
  *@param {*} e
  *@returns {*}
  *return to previous page
  */
  goBack(e) {
    e.preventDefault();
    history.goBack();
  }


  /**
   *@returns {*} renders the modal
   */
  render() {
    const { event, errors, loading } = this.state;
    return (
      <div>
        <div style={{
          backgroundColor: 'rgb(5, 22, 22)',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          paddingBottom: '20px',
          overflow: 'auto'
        }}
        >
          <Header />
          <div className="container">
            <center>
              <Row>
                <div className="card-panel white contain center animated bounceInRight">
                  <div className="title">Create New Event</div>
                  <Row>
                    <Input s={12} name="eventName" value={event.eventName} onChange={this.onChange} label="Event Name" />
                  </Row>
                  <Row>
                    <Input s={12} name="startDate" value={event.startDate} type="date" onChange={this.onDateChange} label="Start Date" />
                  </Row>
                  <Row>
                    <Input s={12} name="days" type="number" value={event.days} onChange={this.onChange} label="Days" />
                  </Row>
                  <Row className="center">
                    <button
                      className="btn waves-effect waves-light btn-large"
                      onClick={this.onSubmit}
                      disabled={!event.days || !event.eventName || !event.startDate}
                    >
                      Create
                    </button>
                    <button className="btn waves-effect waves-light red btn-large" onClick={this.goBack} style={{ marginLeft: '5px' }} >Back
                    </button>
                  </Row>
                </div>
              </Row>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

CreateEventForm.propTypes = propTypes;
CreateEventForm.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    response: state.create
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createEvent: EventActions.createEvent,
  // getEvents: eventAction.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(CreateEventForm);
