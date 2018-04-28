import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import SearchForm from './search-form';
import CenterActions from '../../actions/center-action';
import Header from '../header';
import history from '../../helpers/history';
import Paginator from '../reusables/pagination';
import CenterCard from './center-card';

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
      pagingData: {},
      states: [],
      loading: false,
      serverError: ''
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
  }

  /**
   *@returns {object} fetches all centers
   */
  componentDidMount() {
    const { getAll, getStates } = this.props;
    const query = queryString.parse(window.location.search);
    getStates();
    getAll(query);
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { centers: { data, status }, allStates } = nextProps.response;
    if (nextProps.location.search !== this.props.location.search) {
      const query = queryString.parse(window.location.search);
      this.setState({ loading: true });
      this.props.getAll(query);
    }
    if (status === 'failed') {
      this.setState({
        serverError: data.message,
        data: [],
        loading: false
      });
    }
    if (data && data.data !== this.state.data && status === 'success') {
      const payload = data.data;
      const { pagination } = data.metadata;
      this.setState({ data: payload, pagingData: pagination, loading: false });
    }
    if (allStates.status === 'success') {
      this.setState({ states: allStates.data });
    }
  }

  /**
   *
   * @param {number} newPage
   *
   * @returns {void} -
   */
  onChangePage(newPage) {
    const query = queryString.parse(this.props.location.search);
    query.page = newPage;
    const qString = queryString.stringify(query, { arrayFormat: 'bracket' });
    history.push(`/centers?${qString}`);
  }


  /**
   *
   * @param {number} currentPage
   *
   * @param {number} pageSize
   *
   * @returns{void}
   */
  onPageSizeChange(currentPage, pageSize) {
    const query = queryString.parse(this.props.location.search);
    query.limit = pageSize;
    query.page = currentPage;
    const qString = queryString.stringify(query, { arrayFormat: 'bracket' });
    history.push(`/centers?${qString}`);
  }

  /**
   *
   * @param {object} query
   *
   * @returns {void}
   */
  onSearch(query) {
    const qString = queryString.stringify(query, { arrayFormat: 'bracket' });
    history.push(`/centers?${qString}`);
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
      loading,
      serverError
    } = this.state;

    return (
      <div>
        <Header />
        <div className="background">
          <div className="my-container">
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '45px' }}>Centers</span>
            </div>
            <SearchForm states={states} onSearch={this.onSearch} />
            <Grid>
              <Grid.Row colunms={3}>
                { loading === true &&
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                }
                { serverError && <h2 className="animated fadeInUp">{serverError}</h2> }
                { data &&
                  data.map(item => (
                    <Grid.Column key={item.id}>
                      <CenterCard center={item} />
                    </Grid.Column>
                  ))
                }
              </Grid.Row>
            </Grid>
            { this.state.data.length > 0 &&
            <Paginator
              pagingData={this.state.pagingData}
              onChange={this.onChangePage}
              onShowSizeChange={this.onPageSizeChange}
            />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: {
    centers: state.getAll,
    deleteCenter: state.deleteItem,
    allStates: state.getAllStates
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: CenterActions.getAll,
  deleteCenter: CenterActions.deleteCenter,
  getStates: CenterActions.getAllStates
}, dispatch);

Center.propTypes = {
  response: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  location: PropTypes.objectOf(() => null).isRequired,
  getStates: PropTypes.func
};

Center.defaultProps = {
  response: {},
  getAll: CenterActions.getAll,
  getStates: CenterActions.getAllStates
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
