import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon } from 'react-materialize';
import swal from 'sweetalert2';
import Loader from '../reusables/loader';
import CenterActions from '../../actions/center-action';
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
      center: {},
      facilityList: [],
      pendingEvents: 0
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
    const { center, deleteState } = nextProps.stateProps;
    if (center.data) {
      const facilitiesArr = center.data.facilities.map(f => f.toUpperCase());
      this.setState({
        center: {
          id: center.data.id,
          name: center.data.name,
          address: center.data.address,
          state: center.data.State.statName,
          hallCapacity: center.data.hallCapacity.toString(),
          carParkCapacity: center.data.carParkCapacity.toString(),
          price: center.data.price.toString(),
          image: center.data.image,
          facilities: facilitiesArr,
          events: center.events
        },
        pendingEvents: getPendingEventCount(center.data)
      });
    }

    if (deleteState.status === 'success') {
      history.push('/centers');
    }
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
    history.push(`/upcoming-events/${id}`)
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
   * 
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
    const { center, facilityList, pendingEvents } = this.state;
    return (
      <div>
        <Header />
        <div className="container" style={{ marginTop: '64px' }}>
          <Row>
            <Col s={12}>
              <Row>
                <Col s={6}>
                  <h4 className="title">{center.name}</h4>
                </Col>
                <Col s={6}><Button large className="right orange" waves="light" onClick={this.handleCreate}>ADD EVENT<Icon left>event_note</Icon></Button></Col>
              </Row>
              <div className="slider__holdr">
                <div className="carousel carousel-slider">
                  <a className="carousel-item" href="#one"><img src={center.image} alt="demo" /></a>
                </div>
              </div>
              <p>
                <i className="material-icons">location_on</i>{center.address} {center.state}
                <span role="link" tabIndex="-1" className="new badge blue" data-badge-caption="pending events" onClick={this.getPendingEvent}>{pendingEvents}</span>
              </p>
              {/* <div className="divider" /> */}
            </Col>
            <Col s={12} m={12} l={6} style={{ marginTop: '30px' }}>
              <div className="row center">
                <div className="col s4">
                  <p>Hall Capacity</p>
                </div>
                <div className="col s8">
                  <p>{center.hallCapacity}</p>
                </div>
              </div>
              <div className="divider" />
              <div className="row center">
                <div className="col s4">
                  <p>Parking Space</p>
                </div>
                <div className="col s8">
                  <p>{center.carParkCapacity} cars approx.</p>
                </div>
              </div>
              <div className="divider" />
              <div className="row center">
                <div className="col s4">
                  <p>Price</p>
                </div>
                <div className="col s8">
                  <p><span>₦{center.price}</span> per event</p>
                </div>
              </div>
              <Button s={12} large className="orange" waves="light" onClick={this.getUpcomingEvent}>ADD EVENT<Icon left>event_note</Icon></Button>
            </Col>
            <Col s={12} m={12} l={6} style={{ marginTop: '30px' }}>
              <ul className="collection with-header">
                <li className="collection-header"><h4>Facilities</h4></li>
                {this.renderFacilities()}
              </ul>
            </Col>
          </Row>
        </div>
        <Button floating fab="horizontal" icon="menu" className="action-button pulse" large style={{ bottom: '45px', right: '24px' }}>
          <Button floating icon="mode_edit" className="blue" onClick={this.handleUpdate} />
          <Button floating icon="delete" className="red" onClick={this.handleDelete} />
          <Button floating icon="schedule" className="cyan" onClick={() => {history.push(`/pending-events/${center.id}`); }} />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    center: state.get,
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
