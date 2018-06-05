import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Paginator from '../reusables/pagination';
import EventActions from '../../actions/event-action';
import AuthChecker from '../../helpers/auth-checker';
import EventCard from './event-card';
import Prompt from '../reusables/prompt';

/**
 * Event Component
 * @class
 * @extends Component
 */
export class CenterEvent extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagingData: {},
      loading: false,
      openPrompt: false,
      isRequestMade: false,
      mode: 'ACCEPT'
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.showApprovePrompt = this.showApprovePrompt.bind(this);
    this.showDeclinePrompt = this.showDeclinePrompt.bind(this);
    this.hidePrompt = this.hidePrompt.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  /**
   *@returns {object} fetches all events
   */
  componentDidMount() {
    const locationSearch = window.location.search;
    const query = queryString.parse(locationSearch);
    if (AuthChecker.defineRole() && query.centerId) {
      const { getAll } = this.props;
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
    const { events: { data, status }, newEvent } = nextProps.response;
    const query = queryString.parse(window.location.search);

    // run search if URL changes
    if (nextProps.location.search !== this.props.location.search) {
      this.setState({ loading: true });
      this.props.getAll(query);
    }

    if (newEvent.status === 'success' || newEvent.status === 'failed') {
      this.setState({ openPrompt: false, isRequestMade: false });
    }

    if (status === 'failed') {
      this.setState({ data: [], loading: false });
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
   * @returns {void}
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
   * @param {object} event
   * @returns {void}
   */
  showApprovePrompt(event) {
    this.setState({
      openPrompt: true,
      selectedEvent: event,
      isRequestMade: false,
      mode: 'ACCEPT'
    });
  }

  /**
   * @param {object} event
   * @returns {void}
   */
  showDeclinePrompt(event) {
    this.setState({
      openPrompt: true,
      selectedEvent: event,
      isRequestMade: false,
      mode: 'REJECT'
    });
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
  handleResponse() {
    this.setState({ isRequestMade: true });
    const { id, centerId } = this.state.selectedEvent;
    const { respondToEvent } = this.props;
    const { mode } = this.state;
    let response;
    if (mode === 'ACCEPT') {
      response = { id, status: 'accepted', centerId };
    } else {
      response = { id, status: 'cancelled' };
    }
    respondToEvent(response);
  }

  /**
 *@returns {*} event for sortin
 */
  render() {
    const {
      data,
      loading,
      pagingData,
      openPrompt,
      mode,
      isRequestMade
    } = this.state;

    return (
      <div>
        <div className="background">
          <div className="my-container">
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '45px' }}> Pending Events </span>
            </div>
            <Grid>
              <Grid.Row colunms={3}>
                { loading === true &&
                  <Dimmer active inverted>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                }
                { data.length === 0 &&
                  <h2 className="animated fadeInUp">No Pending Event Currently</h2>
                }
                { data &&
                  data.map(item => (
                    <Grid.Column key={item.id}>
                      <EventCard
                        event={item}
                        mode={mode}
                        onPositive={() => { this.showApprovePrompt(item); }}
                        onNegative={() => { this.showDeclinePrompt(item); }}
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
          <Prompt
            open={openPrompt}
            title={mode === 'ACCEPT' ? 'Accept Event' : 'Reject Event'}
            message="Are you sure you want to respond to this Event?"
            onCancel={this.hidePrompt}
            onConfirm={this.handleResponse}
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
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: EventActions.getAll,
  respondToEvent: EventActions.respondToEvent,
}, dispatch);

CenterEvent.propTypes = {
  response: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  location: PropTypes.objectOf(() => null).isRequired,
  history: PropTypes.objectOf(() => null).isRequired,
  respondToEvent: PropTypes.func,
};

CenterEvent.defaultProps = {
  response: {},
  getAll: EventActions.getAll,
  respondToEvent: EventActions.respondToEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterEvent);
