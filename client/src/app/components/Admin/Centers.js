import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'throttle-debounce/debounce';
import $ from 'jquery.2';
import { Input, Modal, Icon } from 'react-materialize';
import 'materialize-css/dist/js/materialize.min';
import 'materialize-css/dist/css/materialize.min.css';
import Pagination from '../Reusables/Pagination';
import CenterActions from '../../../actions/center.action';

const centerAction = new CenterActions();

/**
 *
 */
class Center extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    const { stateProps } = this.props;
    console.log(stateProps.data, 'in constructor');
    this.state = {
      data: [],
      searchNotfound: '',
      pageOfItems: [],
      itemsPerPage: 7
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.triggerSearch = debounce(100, this.triggerSearch);
    this.handleSelect = this.handleSelect.bind(this);
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
   *
   * @param {*} value
   * @param {*} data
   * @returns {*} trrigers onchange of search input
   */
  triggerSearch(value, data) {
    const { stateProps } = this.props;
    this.setState({ loading: true });
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
      this.setState({ data: stateProps.data });
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
    this.triggerSearch(value, stateProps.data);
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
      console.log('holla');
    }
  }

  /**
   *@param {*} event
   *@returns{*} handle selection of items oer page
   */
  handleSelect(event) {
  }

  /**
   *@returns {*} fetches all centers
   */
  componentDidMount() {
    const { stateProps } = this.props;
    const { getAll } = this.props;
    getAll();
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.stateProps.data !== this.state.data) {
      this.setState({ data: nextProps.stateProps.data }, () => {
        console.log(this.state.data);
      });
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
    } = this.state;
    const { stateProps } = this.props;
    return (
      <div style={{
        backgroundColor: 'rgb(5, 22, 22)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        paddingBottom: '20px',
        overflow: 'auto'
      }}>
        <div className={['container', 'animated', 'bounceInRight'].join(' ')} style={{ paddingTop: '100px' }}>
          <div className={['row', 'center'].join(' ')}>
          </div>
          <div className={['col', 's12', 'm8', 'l12'].join(' ')}>
            <div className={['card-panel', 'white'].join(' ')}>
              <div className='row'>
                <h4 className={['black-text', 'col', 's6'].join(' ')}>
                  Centers
                </h4>
                {!searchNotfound.length || <p className='red-text'>{searchNotfound}</p>}
                <Input s={6} type='text' label='Search....' validate onChange={this.handleSearch}
                onKeyDown={this.handleKeyDown} ref={(searchField) => { this.node = searchField; }}>
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
                      pageOfItems.map((item, index) => {
                        return (<tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.State.statName}</td>
                          <td>
                            <a className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} ><i className=" material-icons">create</i></a>
                            <a className={['waves-effect', 'waves-light', 'btn'].join(' ')} style={{ marginLeft: '5px' }} ><i className=" material-icons">date_range</i></a>
                            <a className={['waves-effect', 'waves-light', 'btn', 'red'].join(' ')} style={{ marginLeft: '5px' }}><i className=" material-icons">delete</i></a>
                          </td>
                        </tr>);
                      })
                    }
                  </tbody>
                </table>
                <div className={['fixed-action-btn', 'click-to-toggle', 'spin-close'].join(' ')}>
                  <a className={['btn-floating', 'btn-large', 'waves-effect', 'waves-light'].join(' ')}>
                    <i className="material-icons">add</i>
                  </a>
                </div>
                <Pagination items={
                  data
                } onChangePage={this.onChangePage} />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateProps: state.getAllCenters
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAll: centerAction.getAll
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
