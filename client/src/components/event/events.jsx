import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Paginator from '../reusables/pagination';
import EventActions from '../../actions/event-action';
import history from '../../helpers/history';
import Header from '../header';
import EventCard from './event-card';
import FormValidator from '../../helpers/form-validator';
// import DeleteEventModal from '../modals/DeleteEvent';


// window.jQuery = window.$ = jQuery;

/**
 * Event Component
 * @class
 * @extends Component
 */
class Event extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagingData: {},
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
   *@returns {object} fetches all events
   */
  componentDidMount() {
    const { getAll } = this.props;
    const query = queryString.parse(window.location.search);
    getAll(query);
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { events: { data, status }, newEvent } = nextProps.response;
    const query = queryString.parse(window.location.search);

    // run search if URL changes
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({ loading: true });
      this.props.getAll(query);
    }

    if (newEvent.status === 'success') {
      this.setState({ openModal: false, isRequestMade: false });
    }

    if (status === 'failed') {
      this.setState({ serverError: data.message, data: [], loading: false });
    }

    if (data && data.data !== this.state.data && status === 'success') {
      const payload = data.data;
      const { pagination } = data.metadata;
      this.setState({ data: payload, pagingData: pagination, loading: false });
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
    history.push(`/events?${qString}`);
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
    history.push(`/events?${qString}`);
  }

  /**
   *
   * @param {object} query
   *
   * @returns {void}
   */
  onSearch(query) {
    const qString = queryString.stringify(query, { arrayFormat: 'bracket' });
    history.push(`/events?${qString}`);
  }

  /**
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    this.setState({ isRequestMade: true, serverError: '' });
    const fv = new FormValidator();
    const { createEvent } = this.props;
    const errors = fv.validateEventForm(event);
    if (errors) {
      this.setState({ errors, isRequestMade: false });
    } else {
      createEvent(event);
    }
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
      loading,
      serverError, // eslint-disable-line
      errors, // eslint-disable-line
      pagingData,
      openModal, // eslint-disable-line
      isRequestMade // eslint-disable-line
    } = this.state;

    return (
      <div>
        <Header />
        <div className="background">
          <div className="my-container">
            <div style={{ textAlign: 'event' }}>
              <span style={{ fontSize: '45px' }}>Events </span>
            </div>
            <Grid>
              <Grid.Row colunms={3}>
                { loading === true &&
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                }
                { data.length === 0 &&
                  <h2 className="animated fadeInUp">No Events Retrieved</h2>
                }
                { data &&
                  data.map(item => (
                    <Grid.Column key={item.id}>
                      <EventCard event={item} />
                    </Grid.Column>
                  ))
                }
              </Grid.Row>
            </Grid>
            { this.state.data.length > 0 &&
            <Paginator
              pagingData={pagingData}
              onChange={this.onChangePage}
              onShowSizeChange={this.onPageSizeChange}
            />
            }
          </div>
          {/* <EventFormModal
            open={openModal}
            states={states}
            onSubmit={this.onSubmit}
            errors={errors}
            hideModal={this.hideModal}
            isRequestMade={isRequestMade}
          /> */}
          <div className="fab pulse" onClick={this.showModal}> + </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: {
    events: state.getAll,
    newEvent: state.create,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: EventActions.getAll,
  deleteEvent: EventActions.deleteEvent,
  createEvent: EventActions.createEvent,
}, dispatch);

Event.propTypes = {
  response: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  location: PropTypes.objectOf(() => null).isRequired,
  createEvent: PropTypes.func,
};

Event.defaultProps = {
  response: {},
  getAll: EventActions.getAll,
  createEvent: EventActions.createEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
