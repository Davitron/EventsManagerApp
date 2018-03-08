import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'throttle-debounce/debounce';
import PropTypes from 'prop-types';
import { Input, Icon } from 'react-materialize';
import swal from 'sweetalert2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pagination from '../reusables/pagination';
import Loader from '../reusables/loader';
import CenterActions from '../../actions/center-action';
import Header from '../header';
import history from '../../helpers/history';
import Toast from '../../helpers/toast';
import Logger from '../../helpers/logger';
// import DeleteCenter from '../modals/delete-center-modal';


// window.jQuery = window.$ = jQuery;

/**
 * @returns {*} Centers Component
 */
class Center extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchNotfound: '',
      pageOfItems: [],
      selectedCenter: {},
      center_Id: undefined,
      loading: true,
      message: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    // CenterActions.getAll()
    const { getAll } = this.props;
    getAll();
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { centers, deleteCenter } = nextProps.stateProps;
    const { data, message } = this.state;
    const { getAll } = this.props;
    if (centers.data && centers.data.allCenters !== data) {
      this.setState({
        data: centers.data.allCenters,
        loading: false,
        message: ''
      });
    }

    if (deleteCenter.data !== message && deleteCenter.data) {
      this.setState({
        message: deleteCenter.data
      });
      getAll();
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
    history.push('/update-center', {
      state: {
        center
      }
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
    const { getAll, deleteCenter } = this.props;
    this.setState({
      center_Id: centerId
    });
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        deleteCenter(centerId);
      }
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
   * @param {*} event
   * @returns {*} triggers when key is pressed
   */
  handleCreate(event) {
    history.push('/create-center');
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

    const { stateProps } = this.props;
    return (
      <div>
        <Header />
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
                  <h4 className={['black-text', 'title', 'col', 's6'].join(' ')}>
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
                            <button className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} onClick={() => this.handleOpen((item.id))} ><i className=" material-icons">create</i></button>
                            <Link className="waves-effect waves-light  btn" style={{ marginLeft: '5px' }} to={`/pending-events/${item.id}`}><i className=" material-icons">schedule</i></Link>
                            <button className={['waves-effect', 'waves-light', 'btn', 'red'].join(' ')} style={{ marginLeft: '5px' }} onClick={() => this.handleDelete((item.id))}><i className=" material-icons">delete</i></button>
                          </td>
                        </tr>))
                    }
                  </tbody>
                </table>
                <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
                  <Link className={['btn-floating', 'btn-large', 'waves-effect', 'waves-light'].join(' ')} to="/create-center">
                    <i className="material-icons">add</i>
                  </Link>
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
        {/* <CreateCenterModal states={states} />
        <UpdateCenterModal states={states} selectedCenter={selectedCenter} />
        <DeleteCenterModal centerId={this.state.center_Id} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    centers: state.getAll,
    deleteCenter: state.deleteItem
    // newCenter: state.createCenter
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: CenterActions.getAll,
  deleteCenter: CenterActions.deleteCenter
}, dispatch);

Center.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  deleteCenter: PropTypes.func,
};

Center.defaultProps = {
  stateProps: {},
  getAll: CenterActions.getAll,
  deleteCenter: CenterActions.deleteCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
