import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import axios from 'axios';
import { Input, Icon, Row, Button } from 'react-materialize';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Header from '../header';
import Loader from '../reusables/loader';
import history from '../../helpers/history';
import CenterActions from '../../actions/center-action';


const facilities = [
  'CCTV',
  'VIP LOUNGE',
  'PROJECTOR',
  'MEDIA SUPPORT',
  'SECURITY',
  'WIFI'
];

/**
 *
 */
class CenterSearch extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: {
        location: 'Location',
        capacity: 'Number of Guests?',
        facilities: []
      },
      loading: false,
      states: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
  }

  /**
  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    const { states } = this.state;
    if (states.length <= 0) {
      axios.get('/api/v1/states')
        .then((response) => {
          this.setState({ states: response.data });
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
   * @returns {*} handles selection of facilities
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
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onSubmit(event) {
    const { searchQuery, states } = this.state;
    const params = new URLSearchParams();
    event.preventDefault();
    const query = {};
    for (const i in searchQuery) {
      if (searchQuery[i] === 'Location' || searchQuery[i] === 'Number of Guests?' || searchQuery[i].length === 0) {
        query[i] = null;
      } else {
        query[i] = searchQuery[i];
      }
    }
    params.set('location', query.location);
    params.set('capacity', query.capacity);
    params.set('facilities', query.facilities);

    history.push(`/center-result?${params}`, {
      state: {
        states,
        facilities,
      }
    });
  }

  /**
   *
   * @param {*} event
   * @param {*} index
   * @param {*} value
   * @returns {*}
  *this handles the event when any property in the state changes
   */
  handleChange(event, index, value) {
    this.setState({
      searchQuery: {
        location: value
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
   *
   * @param {*} values
   * @returns {*}
   * this handles population facilities in a select box
   */
  stateItems(values) {
    return values.map(value => (
      <MenuItem
        insetChildren
        key={shortid.generate()}
        value={value.id}
        primaryText={value.statName}
      />
    ));
  }

  /**
   * @returns{view} for center searching
   */
  render() {
    const { searchQuery, loading, states } = this.state;
    return (
      <div>
        <Header />
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
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ marginTop: '64px' }}>
            <div className={['row', 'center'].join(' ')} />
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className={['card-panel', 'white'].join(' ')}>
                <div className="row">
                  <h4 className={['black-text', 'title', 'col', 's12'].join(' ')}>
                    Find and book the perfect center for your event.
                    {loading === true && <Loader />}
                  </h4>
                </div>
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

                  {/* <Input s={4} label="Hall Capacity" validate /> */}
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
                </Row>
                <Row className="center">
                  <Button
                    waves="light"
                    large
                    className={['cyan', 'animated', 'bounceInUp'].join(' ')}
                    onClick={this.onSubmit}
                  >
                    Search
                    <Icon right>search</Icon>
                  </Button>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   stateProps: {
//     states: state.getStates
//   }
// });

const mapDispatchToProps = dispatch => bindActionCreators({
  searchCenters: CenterActions.search
}, dispatch);

// CenterSearch.propTypes = {
//   searchCenters: PropTypes.func.isRequired
// };


export default connect(null, mapDispatchToProps)(CenterSearch);
