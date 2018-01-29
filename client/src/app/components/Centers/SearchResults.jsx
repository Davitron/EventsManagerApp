import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Input, Icon, Row, Button, Col, Card, CardTitle } from 'react-materialize';
import CreateEventModal from '../modals/CreateEvent';
// import CenterCard from './CenterCard';
import Loader from './../Loader/Loader';
import CenterActions from '../../../actions/center.action';


const centerAction = new CenterActions();
window.jQuery = window.$ = jQuery;

/**
 *
 */
class CenterResults extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      states: [],
      loading: false,
      centerId: undefined
    };
  }

  /**
  /**
   *@returns {*} fetches all centers
   */
  componentDidMount() {
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const facilities = param.get('facilities').split(',').map(x => x.toLowerCase());
    const capacity = param.get('capacity').split(',').map(x => parseInt(x, 10));
    const locationStr = param.get('location');
    const location = parseInt(locationStr, 10);
 
    const searchQuery = {
      location: isNaN(location) ? null : location,
      capacity: isNaN(capacity[0]) ? null : capacity,
      facilities: facilities[0] === 'null' ? null : facilities,
      page: 1
    };

    console.log(searchQuery);
    const { searchCenter, getStates } = this.props;
    searchCenter(searchQuery);
    // getStates();
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.stateProps.centers.data && nextProps.stateProps.centers.data.centers !== this.state.centers) {
      this.setState({
        centers: nextProps.stateProps.centers.data.centers
      }, () => {
        console.log(this.state.centers);
        this.setState({
          loading: false
        }, () => {
          Materialize.toast('Syncronizing.....', 6000, 'blue');
        });
      });
    }
    // if (nextProps.stateProps.states.data !== this.state.states
    //    && nextProps.stateProps.states.data) {
    //   this.setState({
    //     states: nextProps.stateProps.states.data
    //   }, () => {
    //     console.log(this.state.states);
    //   });
    // }
  }

  /**
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleOpen = (centerId) => {
    const { centers } = this.state;
    const center = centers.find(x => x.id === centerId);
    console.log(center);
    this.setState({
      centerId: center.id
    }, () => {
      console.log(this.state.centerId);
      $('#newEvent').modal('open');
    });
  };

  /**
   *
   */
  render() {
    const {
      centers,
      states,
      loading
    } = this.state;
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
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ paddingTop: '50px' }}>
            <div className={['row', 'center'].join(' ')} />
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className={['card-panel', 'white'].join(' ')}>
                <Row>
                  <div className="input-field col s3">
                    <select defaultValue="location">
                      <option value="location" disabled >location</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                  </div>
                  <Input s={3} label="Hall Capacity" validate />
                  <div className="input-field col s3">
                    <select multiple defaultValue={['Facilities']}>
                      <option value="" disabled>Facilities</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                  </div>
                  <Button waves="light" large className={['cyan', 'animated', 'bounceInUp'].join(' ')}>Search<Icon right>search</Icon></Button>
                </Row>
              </div>
              <Row>
                { centers !== null &&
                  centers.map(center => (
                    <Col s={12} m={6} l={4} key={shortid.generate()}>
                      <Card
                        header={<CardTitle reveal image={center.image || '../../../../src/assests/image/banner4.jpg'} waves="light" />}
                        title={center.name}
                        className="cardText"
                        reveal={
                          <div>
                            <Row>
                              <Col s={3}>
                                State:
                              </Col>
                              <Col s={9}>
                                {center.State.statName}
                              </Col>
                            </Row>
                            <Row>
                              <Col s={3}>
                                Capacity:
                              </Col>
                              <Col s={9}>
                                {center.hallCapacity}
                              </Col>
                            </Row>
                            <Row>
                              <Col s={3}>
                                Carpark Space:
                              </Col>
                              <Col s={9}>
                                {center.carParkCapacity}
                              </Col>
                            </Row>
                            <Row>
                              <Col s={3}>
                                facilities:
                              </Col>
                              <Col s={9}>
                                {center.facilities.join(', ')}
                              </Col>
                            </Row>
                            <Row className="center">
                              <Button waves="light" large className={['animated', 'bounceInUp'].join(' ')}>View Upcoming Events</Button>
                            </Row>
                          </div>
                        }
                      >
                        <p><a href="#createEvent" onClick={() => this.handleOpen((center.id))}>Book this center</a></p>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </div>
        <CreateEventModal centerId={this.state.centerId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    centers: state.searchCenter,
    states: state.getStates
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStates: centerAction.getAllStates,
  searchCenter: centerAction.search
}, dispatch);

CenterResults.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getStates: PropTypes.func.isRequired,
  searchCenter: PropTypes.func.isRequired
};

CenterResults.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResults);
