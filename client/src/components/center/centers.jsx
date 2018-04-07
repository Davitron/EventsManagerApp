import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'throttle-debounce/debounce';
import PropTypes from 'prop-types';
import { Input, Icon } from 'react-materialize';
import ReactPaginate from 'react-paginate';
import Pagination from '../reusables/pagination';
import Loader from '../reusables/loader';
import CenterActions from '../../actions/center-action';
import Header from '../header';
import history from '../../helpers/history';

/**
 * Center Component
 * @class
 * @extends Component
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
      loading: true,
      itemsPerPage: 7,
      currentPage: 1
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.toChangePage = this.toChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);
  }

  /**
   *@returns {object} fetches all centers
   */
  componentWillMount() {
    // CenterActions.getAll()
    const { getAll } = this.props;
    getAll(this.state.currentPage);
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { centers } = nextProps.stateProps;
    const { data } = this.state;
    if (centers.data && centers.data.allCenters !== data) {
      const { allCenters, pages } = centers.data;
      this.setState({
        data: allCenters,
        totalPages: pages,
        loading: false,
      });
    }
  }

/**
 *
 * @param {*} pageOfItems
 * @returns {*} -
 */
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  /**
   * @param {object} currentPage
   *
   * @returns {void} 
   */
  loadCentersformServer(currentPage) {
    const { getAll } = this.props;
    this.setState({
      currentPage
    }, () => getAll(this.state.currentPage))
    
  }

  /**
   * @param {object} data
   *
   * @returns {void} for next page
   */
  toChangePage(data) {
    const { selected } = data;
    this.loadCentersformServer(selected + 1);
  }


  /**
   *@param {*} event
  *@returns {*} updates state.search with search parameters
  */
  handleSearch(event) {
    const { value } = event.target;
    const { data } = this.state;
    this.triggerSearch(value, data);
  }

  /**
   *
   * @param {*} value
   * @param {*} data
   * @returns {*} trrigers onchange of search input
   */
  triggerSearch(value, data) {
    const { allCenters } = this.props.stateProps.centers.data;
    if (value.length > 0) {
      const newItems = data.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()));
      if (newItems.length > 0) {
        this.setState({
          data: newItems,
          searchNotfound: '',
        });
      } else {
        this.setState({ searchNotfound: 'Oops!, no center matches this query' });
      }
    } else {
      this.setState({ data: allCenters });
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
      searchNotfound,
      pageOfItems,
      loading,
      itemsPerPage
      // openUpdateModal
    } = this.state;

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
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ marginTop: '64px'}}>
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
                    label="Filter by name"
                    validate
                    onChange={this.handleSearch}
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
                      data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.State.stateName}</td>
                          <td>
                            <Link to={`/centers/${item.id}`}><i className=" material-icons">menu</i></Link>
                          </td>
                        </tr>))
                    }
                  </tbody>
                </table>
                <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
                  <Link className={['btn-floating', 'btn-large', 'waves-effect', 'waves-light', 'action-button'].join(' ')} to="/create-center">
                    <i className="material-icons">add</i>
                  </Link>
                </div>
                <ReactPaginate
                  previousLabel="prev"
                  nextLabel="next"
                  breakLabel={<a href="">...</a>}
                  breakClassName="break-me"
                  pageCount={this.state.totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.toChangePage}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                  />
              </div>
            </div>
          </div>
        </div>
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
};

Center.defaultProps = {
  stateProps: {},
  getAll: CenterActions.getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
