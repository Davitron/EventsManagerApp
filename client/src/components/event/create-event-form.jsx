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

const propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  createEvent: PropTypes.func.isRequired,
  match: PropTypes.objectOf(() => null).isRequired,

};

const defaultProps = {
  stateProps: {}
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
      message: '' // eslint-disable-line
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  /**
   * @param {object} nextProps
   * @returns {*} new props
   */
  componentWillReceiveProps(nextProps) {
    const { response } = nextProps.stateProps;
    if (response.data !== this.props.stateProps.response.data && response) {
      this.setState({
        message: response.data // eslint-disable-line
      }, () => {
        if (response.status === 'success') {
          this.setState({
            loading: false,
            event: {
              eventName: '',
              startDate: '',
              days: '',
              centerId: '',
              image: {}
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
  *@param {*} e
  *@returns {*}
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
   *
   * @param {*} e`
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { event } = this.state;
    const { centerId } = this.props.match.params;
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
          centerId: centerId.toString()
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
          backgroundColor: '#f5f5f5',
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
          <div className="container" style={{ marginTop: '64px' }}>
            <center>
              <Row>
                <div className="card-panel white contain image_input center animated bounceInRight ">
                  <div className="title">Create New Event</div>
                  { loading && <Loader /> }
                  <Row>
                    <Input s={12} name="eventName" value={event.eventName} onChange={this.onChange} label="Event Name" />
                  </Row>
                  <Row>
                    <Input s={12} m={12} l={6} name="startDate" value={event.startDate} type="date" onChange={this.onDateChange} label="Start Date" />
                    <Input s={12} m={12} l={6} name="days" type="number" value={event.days} onChange={this.onChange} label="Days" />
                  </Row>
                  <Row>
                    <div className={['file-field', 'input-field', 's12'].join(' ')}>
                      <div className="btn action-button">
                        <span>Center image</span>
                        <input type="file" name="image" onChange={this.onFileChange} accept="image/*" />
                      </div>
                      <div className="file-path-wrapper">
                        <input className={['file-path', 'validate'].join(' ')} type="text" placeholder={errors.image || 'upload image'} />
                      </div>
                    </div>
                  </Row>
                  <Row className="center">
                    <button
                      className="btn waves-effect waves-light btn-large action-button"
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
