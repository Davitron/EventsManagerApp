import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'throttle-debounce/debounce';
import moment from 'moment';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { Input, Icon } from 'react-materialize';
import Pagination from '../reusables/pagination';
import Loader from '../reusables/loader';
import EventActions from '../../actions/event-action';
import Header from '../header';

/**
 *
 */
class PendingEvent extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchNotfound: '',
      pageOfItems: [],
      event_Id: undefined,
      loading: true,
      message: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);

  }

  /**
   *@returns {*} fetches all events
   */
  componentWillMount() {
    const { getAll } = this.props;
    getAll(parseInt(this.props.match.params.centerId, 10));
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    const { getAll } = this.props;
    const { data, message } = this.state;
    const { events, approveReject } = nextProps.stateProps;
    if (events.data && events.data.pendingEvents !== data) {
      this.setState({
        data: events.data.pendingEvents,
        loading: false,
        message: ''
      });
    }

    if (approveReject.data !== message && approveReject.data) {
      this.setState({
        message: approveReject.data
      });
      getAll(this.props.match.params.centerId, 10);
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
    this.triggerSearch(value, stateProps.events.data.pendingEvents);
  }

  /**
   *
   * @param {*} status
   * @returns {*} style class for status
   */
  handleStatusClass = (status) => {
    if (status === 'pending') return 'chip orange';
    if (status === 'accepted') return 'chip cyan';
    if (status === 'rejected') return 'chip red';
  }

  /**
   * @param {*} eventId
   * @returns {*} update event modal
   */
  handleApprove = (eventId) => {
    const { approveEvent } = this.props;
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
        approveEvent(this.state.event_Id);
      }
    });
  };

  /**
   * @param {*} eventId
   * @returns {*} update event modal
   */
  handleReject = (eventId) => {
    const { rejectEvent } = this.props;
    const { event_Id } = this.state;
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
        rejectEvent(this.state.event_Id);
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
      this.setState({ data: stateProps.events.data.pendingEvents });
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
 *@returns {*} event for sortin
 */
  render() {
    const {
      data,
      searchNotfound,
      pageOfItems,
      loading,
    } = this.state;
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
            <div className={['row', 'event'].join(' ')} />
            <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
              <div className={['card-panel', 'white'].join(' ')}>
                <div className="row">
                  <h4 className={['black-text', 'title', 'col', 's6'].join(' ')}>
                    Pending Events
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
                <table className={['bordered', 'evented', 'centered'].join(' ')}>
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Event Center</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      pageOfItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.eventName}</td>
                          <td>{item.Center.name}</td>
                          <td>{moment(item.startDate).format('YYYY-MM-DD')}</td>
                          <td>{moment(item.endDate).format('YYYY-MM-DD')}</td>
                          <td>
                            <button className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} onClick={() => this.handleApprove((item.id))} ><i className=" material-icons">done</i></button>
                            <button className={['waves-effect', 'waves-light', 'btn', 'red'].join(' ')} style={{ marginLeft: '5px' }} onClick={() => this.handleReject((item.id))} ><i className=" material-icons">cancel</i></button>
                          </td>
                        </tr>))
                    }
                  </tbody>
                </table>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stateProps: {
    events: state.getAll,
    approveReject: state.update,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: EventActions.getPendingEvent,
  approveEvent: EventActions.approveEvent,
  rejectEvent: EventActions.rejectEvent
}, dispatch);

PendingEvent.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  match: PropTypes.objectOf(() => null).isRequired,
  params: PropTypes.objectOf(() => null),
  approveEvent: PropTypes.func,
  rejectEvent: PropTypes.func
};

PendingEvent.defaultProps = {
  stateProps: {},
  params: undefined,
  getAll: EventActions.getPendingEvent,
  approveEvent: EventActions.approveEvent,
  rejectEvent: EventActions.rejectEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingEvent);
