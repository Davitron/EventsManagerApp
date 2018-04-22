import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import MenuItem from 'material-ui/MenuItem';
import ReactPaginate from 'react-paginate';
import { Row, Col, Card, CardTitle } from 'react-materialize';
import history from '../../helpers/history';
import Header from '../header';
import Loader from '../reusables/loader';
import CenterActions from '../../actions/center-action';

/**
 * @class
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
      loading: false,
      facilities: [],
      searchQuery: {
        location: '',
        facilities: '',
        capacity: '',
        page: 1
      },
      totalPages: undefined
    };
    this.onChange = this.onChange.bind(this);
    this.onMultiSelect = this.onMultiSelect.bind(this);
  }

  /**
  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    const param = queryString.parse(window.location.search);
    const facilities = param.facilities.split(',').map(x => x.toLowerCase());
    const capacity = param.capacity.split(',').map(x => parseInt(x, 10));
    const locationStr = param.location;
    const location = parseInt(locationStr, 10);
    this.setState({
      searchQuery: {
        location: isNaN(location) ? null : location,
        capacity: isNaN(capacity[0]) ? null : capacity,
        facilities: facilities[0] === 'null' ? null : facilities,
        page: 1
      }
    }, () => {
      const { searchCenter } = this.props;
      searchCenter(this.state.searchQuery);
    });
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { centers } = nextProps.stateProps;
    if (centers.data && centers.data.data !== this.state.centers) {
      const { data } = centers.data;
      this.setState({
        centers: data,
        loading: false,
        totalPages: centers.data.pages
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
   * @param {object} currentPage
   *
   * @returns {void}
   */
  loadCentersformServer(currentPage) {
    const { searchQuery } = this.state;
    this.setState({
      searchQuery: {
        ...searchQuery,
        page: currentPage
      }
    }, () => {
      const { searchCenter } = this.props;
      searchCenter(this.state.searchQuery);
    });
  }

  /**
   * @param {object} data
   *
   * @returns {void} for next page
   */
  toChangePage(data) {
    const { selected } = data;
    this.loadCentersformServer(selected);
  }


  /**
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleOpen = (centerId) => {
    const { centers } = this.state;
    const center = centers.find(x => x.id === centerId);
    history.push('/create-event', {
      centerId: center.id
    });
  };


  /**
   * @returns {*} view
   */
  render() {
    const {
      centers,
      loading,
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
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ marginTop: '64px' }}>
            <div className={['row', 'center'].join(' ')} />
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className="row">
                <h3 className={['white-text', 'title', 'col', 's6'].join(' ')}>
                  Centers
                  {loading === true && <Loader />}
                </h3>
              </div>
              <Row>
                <Col s={12} className="cards-container">
                  {centers !== null &&
                    centers.map(center => (
                      <Card
                        header={<CardTitle image={center.image || '/image/banner4.jpg'} waves="light" />}
                        title={center.name}
                        className="cardText card hoverable"
                        key={shortid.generate()}
                        onClick={() => { history.push(`/centers/${center.id}`); }}
                      />
                    ))
                  }
                </Col>
              </Row>
              <Row className="center">
                <Col s={12}>
                  <ReactPaginate
                    previousLabel="previous"
                    nextLabel="next"
                    breakLabel={<a href="">...</a>}
                    breakClassName="break-me"
                    pageCount={this.state.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    activeClassName="active"
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
          <Link className={['btn-floating', 'btn-large', 'waves-effect', 'waves-light', 'action-button'].join(' ')} to="/center-search">
            <i className="material-icons">search</i>
          </Link>
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
  searchCenter: PropTypes.func.isRequired,
};

CenterResults.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterResults);
