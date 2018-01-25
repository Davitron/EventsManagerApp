import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'throttle-debounce/debounce';
import PropTypes from 'prop-types';
import { Input, Icon } from 'react-materialize';
import Pagination from '../Reusables/Pagination';
import Loader from './../Loader/Loader';
import CenterActions from '../../../actions/center.action';
import CreateCenterModal from '../modals/CreateCenter';
import UpdateCenterModal from '../modals/UpdateCenter';
import DeleteCenterModal from '../modals/DeleteCenter';

const centerAction = new CenterActions();
window.jQuery = window.$ = jQuery;

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
      selectedCenter: {},
      center_Id: undefined,
      loading: true
    };

    $(document).ready(() => {
      $('#newCenter').modal();
      $('#updateCenter').modal();
      $('#deleteCenter').modal();
    });

    this.handleSearch = this.handleSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    // this.handleClose = this.handleClose.bind(this);
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
    const { getAll } = this.props;
    if (nextProps.stateProps.centers.data !== this.state.data
      && nextProps.stateProps.centers.data) {
      this.setState({
        data: nextProps.stateProps.centers.data
      }, () => {
        console.log(this.state.data);
        this.setState({
          loading: false
        }, () => {
          Materialize.toast('Syncronizing.....', 10000, 'blue');
        });
      });
    }
    if (nextProps.stateProps.states.data !== this.state.states
       && nextProps.stateProps.states.data) {
      this.setState({
        states: nextProps.stateProps.states.data
      }, () => {
        console.log(this.state.states);
      });
    }
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
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleOpen = (centerId) => {
    const { pageOfItems } = this.state;
    const center = pageOfItems.find(x => x.id === centerId);
    console.log(center);
    this.setState({
      selectedCenter: center
    }, () => {
      $('#updateCenter').modal('open');
    });
  };

  handleModalClose = () => {
    this.setState({
      loading: true
    }, () => {
      console.log('loading');
    });
  };

  /**
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleDelete = (centerId) => {
    const { center_Id } = this.state;
    this.setState({
      center_Id: centerId
    }, () => {
      $('#deleteCenter').modal('open');
    });
  };

  /**
   *
   * @param {*} value
   * @param {*} data
   * @returns {*} trrigers onchange of search input
   */
  triggerSearch(value, data) {
    const { stateProps } = this.props;
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
   * @param {*} event
   * @returns {*} triggers when key is pressed
   */
  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.triggerSearch();
    }
  }


  /**
   * @returns {*} for modal control
  */
  handleClose() {
    this.setState({ open: false });
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
      loading,
      selectedCenter,
      // openUpdateModal
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
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ paddingTop: '100px' }}>
            <div className={['row', 'center'].join(' ')} />
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className={['card-panel', 'white'].join(' ')}>
                <div className="row">
                  <h4 className={['black-text', 'col', 's6'].join(' ')}>
                    Centers
                    {loading === true && <Loader />}
                  </h4>
                  {!searchNotfound.length || <p className="red-text">{searchNotfound}</p>}
                  <Input
                    s={6}
                    type="text"
                    label="Search...."
                    validate
                    onChange={this.handleSearch}
                    onKeyDown={this.handleKeyDown}
                    ref={(searchField) => { this.node = searchField; }}
                  >
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
                      pageOfItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.State.statName}</td>
                          <td>
                            <a href="#updateCenter" className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} onClick={() => this.handleOpen((item.id))} ><i className=" material-icons">create</i></a>
                            <button className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} ><i className=" material-icons">date_range</i></button>
                            <a href="#deleteCenter" className={['waves-effect', 'waves-light', 'btn', 'red'].join(' ')} style={{ marginLeft: '5px' }} onClick={() => this.handleDelete((item.id))}><i className=" material-icons">delete</i></a>
                          </td>
                        </tr>))
                    }
                  </tbody>
                </table>
                <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
                  <a className={['btn-floating', 'btn-large', 'waves-effect', 'waves-light'].join(' ')} onClick={() => { $('#createCenter').modal(); }} href="#newCenter">
                    <i className="material-icons">add</i>
                  </a>
                </div>
                <Pagination
                  items={
                    data
                  }
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
        <CreateCenterModal states={states} />
        <UpdateCenterModal states={states} selectedCenter={selectedCenter} />
        <DeleteCenterModal centerId={this.state.center_Id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    centers: state.getAllCenters,
    states: state.getStates,
    newCenter: state.createCenter
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: centerAction.getAll,
  getStates: centerAction.getAllStates
  // createCenter: centerAction.createCenter
}, dispatch);

Center.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getAll: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired
};

Center.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
