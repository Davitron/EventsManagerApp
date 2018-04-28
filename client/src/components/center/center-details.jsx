import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Image, Icon, Button } from 'semantic-ui-react';
import swal from 'sweetalert2';
import CenterActions from '../../actions/center-action';
import CenterTable from './center-table';
import Header from '../header';
import history from '../../helpers/history';

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
      serverError: null
    };
    this.renderFacilities = this.renderFacilities.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.getPendingEvent = this.getPendingEvent.bind(this);
    this.getUpcomingEvent = this.getUpcomingEvent.bind(this);
  }

  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    const { getCenter } = this.props;
    const { centerId } = this.props.match.params;
    getCenter(centerId);
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { singleCenter, deleteState } = nextProps.stateProps;
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
          facilities: center.facilities.map(f => f.toUpperCase()),
          events: center.events
        },
        pendingEvents: getPendingEventCount(center)
      });
    } else if (singleCenter.data && singleCenter.status === 'failed') {
      this.setState({ serverError: singleCenter.data.message });
    }

    if (deleteState.status === 'success') {
      history.push('/centers');
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
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleCreate(centerId) {
    const { id } = this.state.center;
    history.push(`/create-event/${id}`);
  }

  /**
   * @returns {*} update center modal
   */
  handleUpdate() {
    const { id } = this.state.center;
    history.push(`/update-center/${id}`);
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
  * @returns {void}
  */
  renderFacilities() {
    const { facilities } = this.state.center;
    if (facilities) {
      return facilities.map(facility => <li key={shortid.generate()} className="collection-item">{facility}</li>);
    }
  }

  /**
 *@returns {*} event for sortin
 */
  render() {
    const { center, pendingEvents, serverError } = this.state; // eslint-disable-line
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
              <div className="">
                <Image fluid src="http://res.cloudinary.com/eventsmanager/image/upload/v1523025087/llrqzelqzeqxfm6kmv3u.jpg" />
                <div style={{ marginTop: '20px' }}>
                  <span style={{ fontSize: '27px' }}>{center.name}</span><br />
                  <br />
                  <span style={{ fontSize: '18px', marginTop: '20px' }}><Icon name="marker" />{center.address} {center.state}</span>
                </div>
                <CenterTable center={center} />
                <div className="ui grid">
                  <Button primary size="medium" content="Update Center" />
                  <Button negative size="medium" content="Delete Center" />
                  <Button positive size="medium" content="Book an Event Here" />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    singleCenter: state.get,
    deleteState: state.deleteItem
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCenter: CenterActions.getCenter,
  deleteCenter: CenterActions.deleteCenter,
}, dispatch);

CenterDetails.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  match: PropTypes.objectOf(() => null).isRequired,
  deleteCenter: PropTypes.func,
  getCenter: PropTypes.func.isRequired
};

CenterDetails.defaultProps = {
  stateProps: {},
  deleteCenter: CenterActions.deleteCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);
