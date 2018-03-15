import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-materialize';
import swal from 'sweetalert2';
import Loader from '../reusables/loader';
import CenterActions from '../../actions/center-action';
import Header from '../header';
import history from '../../helpers/history';

/**
 * @returns {*} Centers Component
 */
class CenterDetails extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
        center: {}
    }
  }

  /**
   *@returns {*} fetches all centers
   */
  componentWillMount() {
    
  }

  /**
   * @param {*} nextProps
   * @returns {*} change state if new prop is recieved
   */
  componentWillReceiveProps(nextProps) {

  }

  /**
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleUpdate = (centerId) => {
    const { pageOfItems } = this.state;
    const center = pageOfItems.find(x => x.id === centerId);
    history.push('/update-center', {
      state: {
        center
      }
    });
  };


  /**
   * @param {*} centerId
   * @returns {*} update center modal
   */
  handleDelete = (centerId) => {
    const { deleteCenter } = this.props;
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
        deleteCenter(centerId);
      }
    });
  };

  /**
 *@returns {*} event for sortin
 */
  render() {
    return ();
  }
}

const mapStateToProps = state => ({
  stateProps: {
    centers: state.getAll,
    deleteCenter: state.deleteItem
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAll: CenterActions.getAll,
  deleteCenter: CenterActions.deleteCenter,
  updateCenter: CenterActions.updateCenter
}, dispatch);

CenterDetails.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  getAll: PropTypes.func,
  deleteCenter: PropTypes.func,
};

CenterDetails.defaultProps = {
  stateProps: {},
  getAll: CenterActions.getAll,
  deleteCenter: CenterActions.deleteCenter
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterDetails);
