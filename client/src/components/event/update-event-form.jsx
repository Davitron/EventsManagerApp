import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row } from 'react-materialize';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import EventActions from '../../actions/event-action';
import Header from '../header';
import history from '../../helpers/history';
import FormValidator from '../../helpers/form-validator';
import Toast from '../../helpers/toast';
import Loader from '../reusables/loader';


const propTypes = {
  updateEvent: PropTypes.func.isRequired,
  stateProps: PropTypes.objectOf(() => null),
  location: PropTypes.objectOf(() => null).isRequired
};

const defaultProps = {
  stateProps: {}
};
/**
 *component for create event modal
 */
class UpdateEventForm extends Component {
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
    this.goBack = this.goBack.bind(this);
  }

  /**
   * @returns {*} set value of props to event on initial render
   */
  componentWillMount() {
    const { event } = this.props.location.state;
    this.setState({
      event: {
        id: event.id,
        eventName: event.eventName,
        startDate: this.formatDate(event.startDate),
        days: event.days.toString(),
        centerId: event.centerId.toString()
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
    console.log(nextProps);
    const { data, status } = nextProps.stateProps.stateProps;
    if (status === 'success') {
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
    this.setState({ loading: true });
    const fv = new FormValidator();
    const { updateEvent } = this.props;
    const errors = fv.validateCenterForm(event);
    if (errors) {
      this.setState({
        errors
      }, () => {
        this.setState({ loading: false });
        const message = Object.values(this.state.errors).join('\n');
        Toast.error(message);
      });
    } else {
      updateEvent(this.state.event);
    }
    // e.preventDefault();
    // // console.log(this.state.event);
    // // if (this.isValid() === true) {
    // this.setState({
    //   loading: true
    // });
    // const { updateEvent } = this.props;
    // updateEvent(this.state.event);
    // // }
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

  // /**
  //  *@returns {*} check if form imputs are valid
  //  */
  // isValid() {
  //   let validity = true;
  //   const formValidator = new FormValidator();
  //   const { errors, isValid } = formValidator.validateEventInput(this.state.event);
  //   if (isValid === false) {
  //     this.setState({ errors });
  //     validity = false;
  //     return validity;
  //   }
  //   return validity;
  // }

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
                  <div className="title">Update Event</div>
                  {loading && <Loader />}
                  <form className="animate bounceInRight">
                    <Row>
                      <Input
                        s={12}
                        name="eventName"
                        defaultValue={event.eventName}
                        onChange={this.onChange}
                        label="Event Name"
                        labelClassName={event.eventName && 'active'}
                      />
                    </Row>
                    <Row>
                      <Input
                        s={12}
                        name="startDate"
                        defaultValue={event.startDate}
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
                        defaultValue={event.days}
                        onChange={this.onChange}
                        label="Days"
                        labelClassName={event.days && 'active'}
                      />
                    </Row>
                    <Row className="center">
                      <button
                        className="btn waves-effect waves-light btn-large"
                        onClick={this.onSubmit}
                        disabled={!event.days || !event.eventName || !event.startDate}
                      >
                        Update
                      </button>
                      <button className="btn waves-effect waves-light red btn-large" onClick={this.goBack} style={{ marginLeft: '5px' }} >Back
                      </button>
                    </Row>
                  </form>
                </div>
              </Row>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

UpdateEventForm.propTypes = propTypes;
UpdateEventForm.defaultProps = defaultProps;

const matchStateToProps = state => ({
  stateProps: {
    stateProps: state.update
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateEvent: EventActions.updateEvent,
  getEvents: EventActions.getAll
}, dispatch);

export default connect(matchStateToProps, mapDispatchToProps)(UpdateEventForm);
