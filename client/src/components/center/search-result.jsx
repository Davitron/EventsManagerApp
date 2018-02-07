import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import InfiniteScroll from 'react-infinite-scroll-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Input, Icon, Row, Button, Col, Card, CardTitle } from 'react-materialize';
import history from '../../helpers/history';
// import CenterCard from './CenterCard';
import Loader from '../reusables/loader';
import CenterActions from '../../actions/center-action';

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
      facilities: [],
      searchQuery: {
        location: '',
        facilities: '',
        capacity: '',
        page: 1
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
  }

  /**
  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    // const { state } = this.props.location.state;
    const url = new URL(window.location.href);
    const param = queryString.parse(window.location.search);
    const facilities = param.facilities.split(',').map(x => x.toLowerCase());
    const capacity = param.capacity.split(',').map(x => parseInt(x, 10));
    const locationStr = param.location;
    const location = parseInt(locationStr, 10);
    const searchQuery = {
      location: isNaN(location) ? null : location,
      capacity: isNaN(capacity[0]) ? null : capacity,
      facilities: facilities[0] === 'null' ? null : facilities,
      page: 1
    };

    const { searchCenter, getStates } = this.props;
    searchCenter(searchQuery);
    // this.setState({
    //   states: state.states,
    //   facilities: state.facilities
    // });
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.stateProps.centers.data && nextProps.stateProps.centers.data.centers !== this.state.centers) {
      this.setState({
        centers: nextProps.stateProps.centers.data.centers,
        loading: false
      });
    }
  }
  /**
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onChange(event) {
    const { name, value } = event.target;
    console.log(value);
    const { searchQuery } = this.state;
    this.setState({
      searchQuery: {
        ...searchQuery,
        [name]: value
      }
    });
  }

  /**
   *
   * @param {*} event
   * @param {*} index
   * @param {*} values
   * @returns {*} handles selecttion of facilities
   */
  onMultiSelect(event, index, values) {
    const { searchQuery } = this.state;
    this.setState({
      searchQuery: {
        ...searchQuery,
        facilities: values
      }
    });
  }

  /**
   *
   * @param {*} values
   * @returns {*}
   * this handles population facilities in a select box
   */
  menuItems(values) {
    const { facilities } = this.state;
    return facilities.map(facility => (
      <MenuItem
        key={facility}
        insetChildren
        checked={values && values.indexOf(facility) > -1}
        value={facility}
        primaryText={facility}
      />
    ));
  }

  /**
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleOpen = (centerId) => {
    const { centers } = this.state;
    const center = centers.find(x => x.id === centerId);
    history.push('/create-center', {
      centerId: center.id
    });
  };

  /**
   *
   */
  render() {
    const {
      centers,
      states,
      loading,
      searchQuery
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
                  <Input s={12} m={4} l={4} name="location" value={searchQuery.location} onChange={this.onChange} type="select">
                    <option value="Location" disabled>Location</option>
                    {
                      states.map(state => (
                        <option
                          key={state.id}
                          value={state.id}
                        >{state.statName}
                        </option>
                      ))

                    }
                  </Input>
                  <Input
                    s={12}
                    m={4}
                    l={4}
                    name="capacity"
                    value={searchQuery.capacity}
                    type="select"
                    onChange={this.onChange}
                  >
                    <option value="Number of Guests?" disabled>Number of Guests?</option>
                    <option value={[0, 500]}>Less than 500</option>
                    <option value={[500, 1000]}>500 - 1000</option>
                    <option value={[1000, 5000]}>1000 - 5000</option>
                    <option value={[5000, 10000]}>5,000 - 10,000</option>
                    <option value={[50000, 100000]}>50,000 - 100,000</option>
                  </Input>

                  <div className={['input-field', 'col', 's12', 'm4', 'l4'].join(' ')}>
                    <MuiThemeProvider>
                      <SelectField
                        multiple
                        hintText="What Facilities Are Important?"
                        value={searchQuery.facilities}
                        onChange={this.onMultiSelect}
                        fullWidth
                      >
                        {this.menuItems(searchQuery.facilities)}
                      </SelectField>
                    </MuiThemeProvider>
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
                        <p><a onClick={() => this.handleOpen((center.id))}>Book this center</a></p>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    centers: state.search,
    states: state.getStates
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStates: CenterActions.getAllStates,
  searchCenter: CenterActions.search
}, dispatch);

CenterResults.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getStates: PropTypes.func.isRequired,
  searchCenter: PropTypes.func.isRequired,
};

CenterResults.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResults);
