import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Paginator from '../reusables/Paginator';
import EventActions from '../../actions/EventActions';
import AuthChecker from '../../helpers/auth-checker';
import EventCard from './EventCard';
import FormValidator from '../../helpers/form-validator';
import EventFormModal from '../../components/event/EventFormModal';
import Prompt from '../reusables/Confirm';
import Toast from '../../helpers/toast';
import imageUpload from '../../helpers/image-upload';

/**
 * Event Component
 * @class
 * @extends Component
 */
export class Event extends Component {
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
      openPrompt: false,
      isRequestMade: false,
      errors: {}
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showPrompt = this.showPrompt.bind(this);
    this.hidePrompt = this.hidePrompt.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   *@returns {object} fetches all events
   */
  componentDidMount() {
    if (AuthChecker.defineRole()) {
      const { getAll } = this.props;
      const query = queryString.parse(window.location.search);
      getAll(query);
    } else {
      this.props.history.push('/centers');
    }
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { events: { data, status }, newEvent, deleteStatus } = nextProps.response;
    const query = queryString.parse(window.location.search);

    // run search if URL changes
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({ loading: true });
      this.props.getAll(query);
    }

    if (newEvent.status === 'success' || newEvent.status === 'failed') {
      this.setState({ openModal: false, isRequestMade: false });
    }

    if (deleteStatus.status === 'success' || deleteStatus.status === 'failed') {
      this.setState({ openPrompt: false, isRequestMade: false });
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
    this.props.history.push(`/events?${qString}`);
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
    this.props.history.push(`/events?${qString}`);
  }

  /**
   *
   * @param {object} query
   *
   * @returns {void}
   */
  onSearch(query) {
    const qString = queryString.stringify(query, { arrayFormat: 'bracket' });
    this.props.history.push(`/events?${qString}`);
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
    delete event.Center;
    this.setState({ isRequestMade: true, serverError: '' });
    const fv = new FormValidator();
    const { updateEvent } = this.props;
    const errors = fv.validateUpdateEventForm(event);
    if (errors) {
      this.setState({ errors, isRequestMade: false });
    } else if (event.newImage !== event.image) {
      imageUpload(event.newImage)
        .then((imageUrl) => {
          event.image = imageUrl;
          updateEvent(event);
        })
        .catch((error) => {
          Toast.error('Image Upload Error');
        });
    } else {
      updateEvent(event);
    }
  }

  /**
   * @param {object} event
   * @returns {void}
   */
  showModal(event) {
    this.setState({ errors: {}, selectedEvent: event, openModal: true });
  }

  /**
   * @param {number} id
   * @returns {void}
   */
  hideModal() {
    this.setState({ openModal: false });
  }

  /**
   * @param {object} event
   * @returns {void}
   */
  showPrompt(event) {
    this.setState({ openPrompt: true, selectedEvent: event, isRequestMade: false });
  }


  /**
   * @returns {void}
   */
  hidePrompt() {
    this.setState({ openPrompt: false });
  }

  /**
   * @returns {*} update center modal
   */
  handleDelete() {
    const { id } = this.state.selectedEvent;
    const { deleteEvent } = this.props;
    deleteEvent(id);
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
      selectedEvent,
      openPrompt,
      openModal, // eslint-disable-line
      isRequestMade // eslint-disable-line
    } = this.state;

    return (
      <div>
        {/* <Header /> */}
        <div className="background">
          <div className="my-container">
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '30px' }}>Events</span>
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
                      <EventCard
                        event={item}
                        onPositive={() => { this.showModal(item); }}
                        onNegative={() => { this.showPrompt(item); }}
                      />
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
          <EventFormModal
            open={openModal}
            onSubmit={this.onSubmit}
            errors={errors}
            hideModal={this.hideModal}
            isRequestMade={isRequestMade}
            event={selectedEvent}
          />
          <Prompt
            open={openPrompt}
            title="Delete Event"
            message="Are you sure you want to delete this Event"
            onCancel={this.hidePrompt}
            onConfirm={this.handleDelete}
            isRequestMade={isRequestMade}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  response: {
    events: state.getAll,
    newEvent: state.update,
    deleteStatus: state.deleteItem
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: EventActions.getAll,
  deleteEvent: EventActions.deleteEvent,
  updateEvent: EventActions.updateEvent,
}, dispatch);

Event.propTypes = {
  response: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  location: PropTypes.objectOf(() => null).isRequired,
  history: PropTypes.objectOf(() => null).isRequired,
  updateEvent: PropTypes.func,
  deleteEvent: PropTypes.func,
};

Event.defaultProps = {
  response: {},
  getAll: EventActions.getAll,
  updateEvent: EventActions.updateEvent,
  deleteEvent: EventActions.deleteEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
