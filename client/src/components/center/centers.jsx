import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import SearchForm from './search-form';
import CenterActions from '../../actions/center-action';
import CenterFormModal from './create-center-form';
import FormValidator from '../../helpers/form-validator';
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
      serverError: '',
      openModal: false,
      isRequestMade: false,
      errors: {}
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
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
    const { centers: { data, status }, allStates, newCenter } = nextProps.response;
    const query = queryString.parse(window.location.search);

    // run search if URL changes
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({ loading: true });
      this.props.getAll(query);
    }

    if (newCenter.status === 'success') {
      this.setState({ openModal: false, isRequestMade: false });
      // history.push('/centers');
    }

    if (status === 'failed') {
      this.setState({ serverError: data.message, data: [], loading: false });
    }

    if (data && data.data !== this.state.data && status === 'success') {
      const payload = data.data;
      const { pagination } = data.metadata;
      this.setState({
        data: payload,
        pagingData: pagination,
        loading: false,
        serverError: null
      });
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
   *
   * @param {object} center
   *
   * @returns {void}
   *
   * this handles the event when form is submitted
   */
  onSubmit(center) {
    this.setState({ isRequestMade: true, serverError: '' });
    const fv = new FormValidator();
    const { createCenter } = this.props;
    const errors = fv.validateCenterForm(center);
    if (errors) {
      this.setState({ errors, isRequestMade: false });
    } else {
      createCenter(center);
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
   * @returns {void}
   */
  showModal() {
    this.setState({ errors: {}, openModal: true });
  }

  /**
   * @returns {void}
   */
  hideModal() {
    this.setState({ openModal: false });
  }

  /**
 *@returns {*} event for sortin
 */
  render() {
    const {
      data,
      states,
      loading,
      serverError,
      errors,
      openModal,
      isRequestMade
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
          <CenterFormModal
            open={openModal}
            states={states}
            onSubmit={this.onSubmit}
            errors={errors}
            hideModal={this.hideModal}
            isRequestMade={isRequestMade}
          />
          <div className="fab pulse" onClick={this.showModal}> + </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: {
    centers: state.getAll,
    newCenter: state.create,
    allStates: state.getAllStates
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: CenterActions.getAll,
  deleteCenter: CenterActions.deleteCenter,
  getStates: CenterActions.getAllStates,
  createCenter: CenterActions.createCenter,
}, dispatch);

Center.propTypes = {
  response: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  location: PropTypes.objectOf(() => null).isRequired,
  getStates: PropTypes.func,
  createCenter: PropTypes.func,
};

Center.defaultProps = {
  response: {},
  getAll: CenterActions.getAll,
  getStates: CenterActions.getAllStates,
  createCenter: CenterActions.createCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
