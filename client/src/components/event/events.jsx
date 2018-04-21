import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import debounce from 'throttle-debounce/debounce';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { Row, Col, Card, CardTitle } from 'react-materialize';
import Pagination from '../reusables/pagination';
import Loader from '../reusables/loader';
import EventActions from '../../actions/event-action';
import history from '../../helpers/history';
import Header from '../header';
// import DeleteEventModal from '../modals/DeleteEvent';


// window.jQuery = window.$ = jQuery;

/**
 * @returns {*} Event Component
 *
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
      searchNotfound: '',
      event_Id: undefined,
      loading: true,
      message: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    // this.onChangePage = this.onChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /**
   *@returns {*} fetches all events
   */
  componentDidMount() {
    const { getAll } = this.props;
    getAll();
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { events, eventDeleted } = nextProps.stateProps;
    const { data, message } = this.state;
    const { getAll } = this.props;
    if (events.data && events.data.data !== data) {
      this.setState({
        data: events.data.data,
        pagingData: events.data.meta,
        loading: false,
        message: ''
      });
    }

    if (eventDeleted.data !== message && eventDeleted.status === 'success' && eventDeleted.data) {
      this.setState({
        message: eventDeleted.data
      });
      getAll();
    }
  }

  // /**
  //  *
  //  * @param {*} pageOfItems
  //  * @returns {*} newPage
  //  */
  // onChangePage(pageOfItems) {
  //   const { stateProps } = this.props;
  //   // update state with new page of items
  //   if (pageOfItems) {
  //     this.setState({ pageOfItems });
  //   } else {
  //     this.setState({ pageOfItems: stateProps });
  //   }
  // }

  /**
   *@param {*} event
  *@returns {*} updates state.search with search parameters
  */
  handleSearch(event) {
    clearTimeout(this.state.loadTimeOut);
    const { value } = event.target;
    const { stateProps } = this.props;
    this.triggerSearch(value, stateProps.events.data.allEvents);
  }

  /**
   *
   * @param {*} status
   * @returns {*} style class for status
   */
  handleStatusClass = (status) => {
    if (status === 'pending') return 'orange-text';
    if (status === 'accepted') return 'cyan-text';
    if (status === 'rejected') return 'red-text';
  }

  /**
   * @param {*} eventId
   * @returns {*} update event modal
   */
  handleOpen = (eventId) => {
    history.push(`/update-event/${eventId}`);
  };

  /**
   * @param {*} eventId
   * @returns {*} update event modal
   */
  handleDelete = (eventId) => {
    const { deleteEvent } = this.props;
    this.setState({
      event_Id: eventId
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
        deleteEvent(this.state.event_Id);
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
        item.eventName.toLowerCase().includes(value.toLowerCase()));
      if (newItems.length > 0) {
        this.setState({
          data: newItems,
          searchNotfound: '',
        });
      } else {
        this.setState({ searchNotfound: 'no event matches this query' });
      }
    } else {
      this.setState({ data: stateProps.events.data.allEvents });
    }
  }

  /**
 *@returns {*} event for sortin
 */
  render() {
    const {
      data,
      searchNotfound, // eslint-disable-line
      loading,
      pagingData
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
          <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ marginTop: '64px' }}>
            <div className={['row', 'center'].join(' ')} />
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className="row">
                <h3 className={['title', 'col', 's6', 'black-text'].join(' ')}>
                  My Events
                  {loading === true && <Loader />}
                </h3>
              </div>
              <Row>
                <Col s={12} className="cards-container">
                  {data !== null &&
                    data.map(event => (
                      <Card
                        header={<CardTitle image={event.image || '/images/banner4.jpg'} waves="light" />}
                        title={event.eventName}
                        className="cardText card hoverable"
                        key={shortid.generate()}
                      >
                        <p>{moment(event.startDate).format('MMMM Do YYYY')} - {moment(event.endDate).format('MMMM Do YYYY')}</p>
                        <span>{event.Center.name}</span><br />
                        <span className={this.handleStatusClass(event.status)}>
                          {event.status}
                          <i role="button" tabIndex="-1" className=" material-icons delete right" onClick={() => { this.handleDelete(event.id); }}>delete</i>
                          <i role="button" tabIndex="-1" className=" material-icons edit right" onClick={() => { this.handleOpen(event.id); }}>mode_edit</i>
                        </span>
                      </Card>
                    ))
                  }
                </Col>
              </Row>
              <Pagination pagingData={pagingData} />
            </div>
          </div>
        </div>
        <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
          <Link className={['btn-floating', 'btn-large', 'waves-effect', 'waves-light', 'action-button'].join(' ')} to="/center-search">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    events: state.getAll,
    eventDeleted: state.deleteItem
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: EventActions.getAll,
  deleteEvent: EventActions.deleteEvent
}, dispatch);

Event.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getAll: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func
};

Event.defaultProps = {
  stateProps: {},
  deleteEvent: EventActions.deleteEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
