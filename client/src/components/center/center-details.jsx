import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import swal from 'sweetalert2';
import CenterActions from '../../actions/center-action';
import CenterTable from './center-table';
import CenterFormModal from './create-center-form';
import FormValidator from '../../helpers/form-validator';
import Header from '../header';
import history from '../../helpers/history';
import ImageUpload from '../../helpers/image-upload';
import Toast from '../../helpers/toast';

const getPendingEventCount = ({ events }) => {
  const pendingEvents = events.filter(event => event.status === 'pending');
  return pendingEvents.length;
};


/**
 * @returns {*} Centers Component
 */
class CenterDetails extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      pendingEvents: 0,
      serverError: null,
      states: [],
      isRequestMade: false,
      openModal: false,
      errors: {}
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getPendingEvent = this.getPendingEvent.bind(this);
    this.getUpcomingEvent = this.getUpcomingEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    const { getCenter, getStates } = this.props;
    const { centerId } = this.props.match.params;
    getStates();
    getCenter(centerId);
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const {
      singleCenter,
      deleteState,
      allStates,
      updatedCenter
    } = nextProps.stateProps;
    if (singleCenter.data && singleCenter.status === 'success') {
      const { center } = singleCenter.data;
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
          events: center.events,
          stateId: center.stateId
        },
        pendingEvents: getPendingEventCount(center)
      });
    } else if (singleCenter.data && singleCenter.status === 'failed') {
      this.setState({ serverError: singleCenter.data.message });
    }

    if (updatedCenter.status === 'success') {
      this.setState({ openModal: false, isRequestMade: false });
      // history.push('/centers');
    }

    if (deleteState.status === 'success') {
      history.push('/centers');
    }

    if (allStates.status === 'success') {
      this.setState({ states: allStates.data });
    }
  }

  /**
   *
   * @param {object} center
   *
   * @returns {void}
   *
   * this handles the event when form is submitted
   */
  onSubmit(center) {
    this.setState({ isRequestMade: true, serverError: '' });
    const fv = new FormValidator();
    const { updateCenter } = this.props;
    const errors = fv.validateUpdateCenterForm(center);
    if (errors) {
      this.setState({ errors, isRequestMade: true });
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
   * @param {*} eventId
   * @returns {void}
   */
  getPendingEvent() {
    const { id } = this.state.center;
    history.push(`/pending-events/${id}`);
  }

  /**
   *
   * @param {*} eventId
   * @returns {void}
   */
  getUpcomingEvent() {
    const { id } = this.state.center;
    history.push(`/upcoming-events/${id}`);
  }

  /**
   * @returns {void}
   */
  showModal() {
    this.setState({ openModal: true });
  }

  /**
   * @returns {void}
   */
  hideModal() {
    this.setState({ openModal: false });
  }


  /**
   * @returns {*} update center modal
   */
  handleDelete() {
    const { id } = this.state.center;
    const { deleteCenter } = this.props;
    swal({
      title: 'Are you sure you want to delete this center?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        deleteCenter(id);
      }
    });
  }


  /**
 *@returns {*} event for sortin
 */
  render() {
    const { center, pendingEvents, serverError, openModal, states, isRequestMade, errors } = this.state; // eslint-disable-line
    return (
      <div>
        <Header />
        <div className="background">
          <div className="my-container">
            { serverError &&
              <div style={{ textAlign: 'center' }}>
                <h2 className="animated fadeInUp">{serverError}</h2>
              </div>
            }
            { center &&
              <div>
                <div>
                  {/* <Image fluid src={center.image} /> */}
                  <img src={center.image} alt="Lights" className="w3-image" />
                </div>
                <div style={{ marginTop: '20px' }}>
                  <span style={{ fontSize: '27px' }}>{center.name}</span><br />
                  <br />
                  <span style={{ fontSize: '18px', marginTop: '20px' }}><Icon name="marker" />{center.address} {center.state}</span>
                </div>
                <CenterTable center={center} />
                <div className="ui grid">
                  <Button primary onClick={this.showModal} size="medium" content="Update Center" />
                  <Button negative size="medium" content="Delete Center" />
                  <Button positive size="medium" content="Book an Event Here" />
                </div>
              </div>
            }
          </div>
          <CenterFormModal
            open={openModal}
            states={states}
            onSubmit={this.onSubmit}
            errors={errors}
            hideModal={this.hideModal}
            isRequestMade={isRequestMade}
            center={center}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    singleCenter: state.get,
    deleteState: state.deleteItem,
    updatedCenter: state.update,
    allStates: state.getAllStates
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCenter: CenterActions.getCenter,
  deleteCenter: CenterActions.deleteCenter,
  updateCenter: CenterActions.updateCenter,
  getStates: CenterActions.getAllStates,
}, dispatch);

CenterDetails.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  match: PropTypes.objectOf(() => null).isRequired,
  deleteCenter: PropTypes.func,
  getStates: PropTypes.func,
  updateCenter: PropTypes.func,
  getCenter: PropTypes.func.isRequired
};

CenterDetails.defaultProps = {
  stateProps: {},
  deleteCenter: CenterActions.deleteCenter,
  getStates: CenterActions.getAllStates,
  updateCenter: CenterActions.updateCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);
