import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery.2';
import debounce from 'throttle-debounce/debounce';
import { Input, Modal, Icon } from 'react-materialize';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Pagination from '../Reusables/Pagination';
import CenterActions from '../../../actions/center.action';

const centerAction = new CenterActions();

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
class Center extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      states: [],
      searchNotfound: '',
      pageOfItems: [],
      itemsPerPage: 7,
      center: {
        name: '',
        price: '',
        address: '',
        image: undefined,
        hallCapacity: '',
        carParkCapacity: '',
        stateId: '',
        facilities: []
      }
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
  }


  /**
   * @param {*} event
   * @returns {*} triggers when key is pressed
   */
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.triggerSearch();
    }
  }

  /**
   *
   * @param {*} value
   * @param {*} data
   * @returns {*} trrigers onchange of search input
   */
  triggerSearch(value, data) {
    const { stateProps } = this.props;
    this.setState({ loading: true });
    if (value.length > 0) {
      const newItems = data.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()));
      if (newItems.length > 0) {
        this.setState({
          data: newItems,
          searchNotfound: '',
        });
      } else {
        this.setState({ searchNotfound: 'no center matches this query' });
      }
    } else {
      this.setState({ data: stateProps.centers.data });
    }
  }

  /**
 *@param {*} event
 *@returns {*} updates state.search with search parameters
 */
  handleSearch(event) {
    clearTimeout(this.state.loadTimeOut);
    const { value } = event.target;
    const { stateProps } = this.props;
    this.triggerSearch(value, stateProps.centers.data);
  }

  /**
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onChange(event) {
    const { name, value } = event.target;
    const { center } = this.state;
    this.setState({
      center: {
        ...center,
        [name]: value
      }
    });
  }

  /**
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onFileChange(event) {
    const { name, files } = event.target;
    const { center } = this.state;
    this.setState({
      center: {
        ...center,
        [name]: files[0]
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
    const { center } = this.state;
    this.setState({
      center: {
        ...center,
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
    return facilities.map(facility => (
      <MenuItem
        key={facility}
        insetChildren={true}
        checked={values && values.indexOf(facility) > -1}
        value={facility}
        primaryText={facility}
      />
    ));
  }
  /**
   *
   * @param {*} event
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    event.preventDefault();
    const { createCenter } = this.props;
    createCenter(this.state.center);
  }

  /**
   *
   * @param {*} pageOfItems
   * @returns {*} newPage
   */
  onChangePage(pageOfItems) {
    const { stateProps } = this.props;
    // update state with new page of items
    if (pageOfItems) {
      this.setState({ pageOfItems });
    } else {
      this.setState({ pageOfItems: stateProps });
      console.log('holla');
    }
  }

  /**
   *@returns {*} fetches all centers
   */
  componentDidMount() {
    const { getAll, getStates } = this.props;
    getAll();
    getStates();
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.stateProps.centers.data !== this.state.data) {
      this.setState({
        data: nextProps.stateProps.centers.data
      }, () => {
        console.log(this.state.data);
      });
    }
    if (nextProps.stateProps.states.data !== this.state.states && nextProps.stateProps.states.data) {
      this.setState({
        states: nextProps.stateProps.states.data
      }, () => {
        console.log(this.state.states);
      });
    }
  }


  /**
 *@returns {*} event for sortin
 */
  render() {
    const {
      data,
      states,
      searchNotfound,
      pageOfItems,
      center,
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
        }}>
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ paddingTop: '100px' }}>
            <div className={['row', 'center'].join(' ')}>
            </div>
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className={['card-panel', 'white'].join(' ')}>
                <div className='row'>
                  <h4 className={['black-text', 'col', 's6'].join(' ')}>
                    Centers
                  </h4>
                  {!searchNotfound.length || <p className='red-text'>{searchNotfound}</p>}
                  <Input s={6} type='text' label='Search....' validate onChange={this.handleSearch}
                    onKeyDown={this.handleKeyDown}
                    ref={(searchField) => { this.node = searchField; }}>
                    <Icon>search</Icon>
                  </Input>
                </div>
                  <table className={['bordered', 'centered'].join(' ')}>
                    <thead>
                      <tr>
                          <th>Center Name</th>
                          <th>state</th>
                          <th>Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                        pageOfItems.map((item, index) => {
                          return (<tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.State.statName}</td>
                            <td>
                              <a className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} ><i className=' material-icons'>create</i></a>
                              <a className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} ><i className=' material-icons'>date_range</i></a>
                              <a className={['waves-effect', 'waves-light', 'btn', 'red'].join(' ')} style={{ marginLeft: '5px' }}><i className=' material-icons'>delete</i></a>
                            </td>
                          </tr>);
                        })
                      }
                    </tbody>
                  </table>
                  <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
                    <a className={['btn-floating', 'modal-trigger', 'btn-large', 'waves-effect', 'waves-light'].join(' ')} href='#createCenter'>
                      <i className='material-icons'>add</i>
                    </a>
                  </div>
                  <Pagination items={
                    data
                  } onChangePage={this.onChangePage} />
                </div>
              </div>
          </div>
        </div>
        <div className='center-modal'>
          <div id='createCenter' className='modal' ref={(md) => { this.modal = md; }}>
            <div className='modal-content'>
              <h4>Create Center</h4>
              <div className='row'>
                <form className={['col', 'row', 's12'].join(' ')} onSubmit={this.onSubmit}>
                  <div className={['row'].join(' ')}>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input id='image_url' type='text' name='name' value={center.name} onChange={this.onChange} className='validate'></input>
                      <label htmlFor='image_url'>Center Name</label>
                    </div>
                    <Input s={6} name='stateId' value={center.stateId} onChange={this.onChange} type='select' label='States'>
                      <option defaultValue='State' disabled>Select States</option>
                      { 
                        states.map((state) => {
                          return <option key={state.id}
                            value={state.id}>{state.statName}</option>;
                        })
                      }
                    </Input>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input id='address' type='text' className='validate' name='address' value={center.address} onChange={this.onChange}></input>
                      <label htmlFor='address'>Address</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input id='hall' name='hallCapacity' value={center.hallCapacity} type='number' onChange={this.onChange} className='validate'></input>
                      <label htmlFor='hall'>Hall Capacity</label>
                    </div>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                        <input id='carPark' name='carParkCapacity' value={center.carParkCapacity} type='number' onChange={this.onChange} className='validate'></input>
                        <label htmlFor='carPark'>Parking Capactiy</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <MuiThemeProvider>
                        <SelectField
                          multiple={true}
                          hintText="Select Facilities"
                          value={center.facilities}
                          onChange={this.onMultiSelect}
                        >
                          {this.menuItems(center.facilities)}
                        </SelectField>
                      </MuiThemeProvider>
                    </div>
                  </div>
                  <div className={['row'].join(' ')}>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input id='image_url' name='price' value={center.price} type='number' onChange={this.onChange} className='validate'></input>
                      <label htmlFor='image_url'>Price</label>
                    </div>
                  </div>
                  <div className={['file-field', 'input-field', 's12'].join(' ')}>
                    <div className='btn'>
                      <span>Center image</span>
                      <input type='file' name='image' onChange={this.onFileChange} accept='image/*'></input>
                    </div>
                    <div className='file-path-wrapper'>
                      <input className={['file-path', 'validate'].join(' ')} type='text'></input>
                    </div>
                  </div>
                  <div className=''>
                  <button className={['col', 's12', 'l12', 'btn', 'btn-large', 'waves-effect'].join(' ')}
                    disabled='' onClick={this.onSubmit}>Create</button>
                  </div>
                </form>
                <div className='row'>
                  <button className={['col', 's12', 'l12', 'modal-action', 'modal-close', 'waves-effect', 'btn', 'btn-large', 'red'].join(' ')}>
                    Cancel</button>
                </div>
              </div>
            </div>
            {/* <div className='modal-footer'>

                  Cancel</button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateProps: {
      centers: state.getAllCenters,
      states: state.getStates
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAll: centerAction.getAll,
    getStates: centerAction.getAllStates,
    createCenter: centerAction.createCenter
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
