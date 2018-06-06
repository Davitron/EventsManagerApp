import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon, Button, Label } from 'semantic-ui-react';
import CenterActions from '../../actions/center-action';
import EventActions from '../../actions/event-action';
import CenterTable from './center-table';
import CenterFormModal from './create-center-form';
import EventFormModal from '../event/create-event-form';
import FormValidator from '../../helpers/form-validator';
import AuthChecker from '../../helpers/auth-checker';
import ImageUpload from '../../helpers/image-upload';
import Toast from '../../helpers/toast';
import Prompt from '../reusables/prompt';

/**
 * @returns {*} Centers Component
 */
export class CenterDetails extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userRole: undefined,
      center: null,
      serverError: null,
      states: [],
      isRequestMade: false,
      openModal: false,
      openPrompt: false,
      openEventModal: false,
      errors: {}
    };

    this.showModal = this.showModal.bind(this);
    this.showEventModal = this.showEventModal.bind(this);
    this.showPrompt = this.showPrompt.bind(this);
    this.hidePrompt = this.hidePrompt.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getPendingEvent = this.getPendingEvent.bind(this);
    this.getUpcomingEvent = this.getUpcomingEvent.bind(this);
    this.handleUpdateCenter = this.handleUpdateCenter.bind(this);
    this.handleEventBooking = this.handleEventBooking.bind(this);
    this.renderMainView = this.renderMainView.bind(this);
  }

  /**
   *@returns {*} set current user role
   */
  componentWillMount() {
    const role = AuthChecker.defineRole();
    this.setState({ userRole: role });
  }

  /**
   *@returns {*} fetches all centers
   */
  componentDidMount() {
    const { getCenter, getStates } = this.props;
    const { centerId } = this.props.match.params;
    if (!isNaN(centerId) && Number.isInteger(parseInt(centerId, 10))) {
      getStates();
      getCenter(centerId);
    } else {
      this.props.history.push('/notFound');
    }
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const {
      singleCenter,
      allStates,
      updatedCenter,
      newEvent
    } = nextProps.response;

    if (singleCenter.data && singleCenter.status === 'success') {
      const { center, metadata } = singleCenter.data;
      this.setState({
        center: {
          id: center.id,
          name: center.name,
          address: center.address,
          state: center.State.stateName,
          hallCapacity: center.hallCapacity.toString(),
          carParkCapacity: center.carParkCapacity.toString(),
          price: center.price.toString(),
          image: center.image,
          newImage: center.image,
          facilities: center.facilities,
          pendingEvent: metadata.pendingEventCount,
          stateId: center.stateId
        },
        serverError: ''
      });
    } else if (singleCenter.data && singleCenter.status === 'failed') {
      this.props.history.push('/notFound');
    }

    if (updatedCenter.status !== 'ongoing' || newEvent.status !== 'ongoing') {
      this.setState({ openModal: false, openEventModal: false, isRequestMade: false });
    }

    if (allStates.status === 'success') {
      this.setState({ states: allStates.data });
    }
  }

  /**
   *
   * @param {*} eventId
   * @returns {void}
   */
  getPendingEvent() {
    const { id } = this.state.center;
    this.props.history.push(`/pending-events?status=pending&centerId=${id}`);
  }

  /**
   *
   * @param {*} eventId
   * @returns {void}
   */
  getUpcomingEvent() {
    const { id } = this.state.center;
    this.props.history.push(`/upcoming-events/${id}`);
  }

  /**
   * @returns {void}
   */
  showModal() {
    this.setState({ errors: {}, openModal: true });
  }

  /**
   * @returns {void}
   */
  showEventModal() {
    this.setState({ errors: {}, openEventModal: true });
  }

  /**
   * @returns {void}
   */
  showPrompt() {
    this.setState({ openPrompt: true, isRequestMade: false });
  }

  /**
   * @returns {void}
   */
  hideModal() {
    this.setState({ openModal: false, openEventModal: false });
  }

  /**
   * @returns {void}
   */
  hidePrompt() {
    this.setState({ openPrompt: false });
  }


  /**
   * @returns {*} update center modal
   */
  handleDelete() {
    const { id } = this.state.center;
    const { deleteCenter } = this.props;
    deleteCenter(id, this.props.history);
  }

  /**
   *
   * @param {object} center
   *
   * @returns {void}
   *
   * this handles the event when form is submitted
   */
  handleUpdateCenter(center) {
    this.setState({ isRequestMade: true, serverError: '' });
    const fv = new FormValidator();
    const { updateCenter } = this.props;
    const errors = fv.validateUpdateCenterForm(center);
    if (errors) {
      this.setState({ errors, isRequestMade: false });
      return null;
    } else if (center.newImage !== center.image) {
      ImageUpload(center.newImage)
        .then((imageUrl) => {
          center.image = imageUrl;
          updateCenter(center);
        })
        .catch((error) => {
          Toast.error(error);
        });
    } else {
      updateCenter(center);
    }
  }

  /**
  *
  * @param {object} event
  *
  * @returns {void}
  *
  * this handles the event when form is submitted
  */
  handleEventBooking(event) {
    this.setState({ isRequestMade: true, serverError: '' });
    const fv = new FormValidator();
    const { createEvent } = this.props;
    const { center } = this.state;
    const errors = fv.validateEventForm(event);
    if (errors) {
      this.setState({ errors, isRequestMade: false });
    } else {
      ImageUpload(event.image)
        .then((imageUrl) => {
          event.image = imageUrl;
          event.centerId = center.id;
          createEvent(event);
        })
        .catch((error) => {
          Toast.error(error);
        });
    }
  }

  /**
   *
   * @returns {void}
   */
  renderMainView() {
    const { serverError, center, userRole } = this.state;
    return (
      <div className="my-container">
        { serverError &&
          <div style={{ textAlign: 'center' }}>
            <h2 className="animated fadeInUp">{serverError}</h2>
          </div>
        }
        { center &&
          <div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '45px' }}>{center.name}</span>
            </div>
            <div style={{ marginTop: '20px' }}>
              <img src={center.image} alt="Lights" className=" w3-image" />
            </div>
            <div style={{ marginTop: '20px' }}>
              { userRole === 'admin' && <Label as="a" color="red" onClick={this.getPendingEvent} >{center.pendingEvent} Pending Events</Label>}<br />
              <br />
              <span className="center-address" style={{ fontSize: '18px', marginTop: '20px' }}><Icon name="marker" />{center.address} {center.state}</span>
            </div>
            <CenterTable center={center} />
            <div className="ui grid">
              { userRole === 'admin' && <Button primary onClick={this.showModal} size="medium" content="Update Center" />}
              { userRole === 'admin' && <Button negative onClick={this.showPrompt} size="medium" content="Delete Center" />}
              { userRole && <Button positive onClick={this.showEventModal} size="medium" content="Book an Event Here" />}
            </div>
          </div>
        }
      </div>
    );
  }

  /**
 *@returns {*} event for sortin
 */
  render() {
    const {
      center,
      pendingEvents, // eslint-disable-line
      openModal,
      openEventModal,
      states,
      isRequestMade,
      errors,
      openPrompt
    } = this.state;
    return (
      <div>
        <div className="background">
          {this.renderMainView()}
          <CenterFormModal
            open={openModal}
            states={states}
            onSubmit={this.handleUpdateCenter}
            errors={errors}
            hideModal={this.hideModal}
            isRequestMade={isRequestMade}
            center={center}
          />
          <EventFormModal
            open={openEventModal}
            onSubmit={this.handleEventBooking}
            errors={errors}
            hideModal={this.hideModal}
            isRequestMade={isRequestMade}
          />
          <Prompt
            open={openPrompt}
            title="Delete Center"
            message="Are you sure you want to delete this center"
            onCancel={this.hidePrompt}
            onConfirm={this.handleDelete}
            isRequestMade={isRequestMade}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: {
    singleCenter: state.get,
    deleteState: state.deleteItem,
    updatedCenter: state.update,
    allStates: state.getAllStates,
    newEvent: state.create,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCenter: CenterActions.getCenter,
  deleteCenter: CenterActions.deleteCenter,
  updateCenter: CenterActions.updateCenter,
  getStates: CenterActions.getAllStates,
  createEvent: EventActions.createEvent
}, dispatch);

CenterDetails.propTypes = {
  response: PropTypes.objectOf(() => null),
  match: PropTypes.objectOf(() => null).isRequired,
  deleteCenter: PropTypes.func,
  getStates: PropTypes.func,
  updateCenter: PropTypes.func,
  history: PropTypes.objectOf(() => null).isRequired,
  createEvent: PropTypes.func,
  getCenter: PropTypes.func.isRequired
};

CenterDetails.defaultProps = {
  response: {},
  deleteCenter: CenterActions.deleteCenter,
  getStates: CenterActions.getAllStates,
  updateCenter: CenterActions.updateCenter,
  createEvent: EventActions.createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);
