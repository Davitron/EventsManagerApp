import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CenterActions from '../../../actions/center.action';
import Loader from './../Loader/Loader';

const centerAction = new CenterActions();

const propTypes = {
  centerId: PropTypes.number,
  deleteCenter: PropTypes.func.isRequired
};

const defaultProps = {
  centerId: undefined
};
/**
  *
  */
class DeleteCenterModal extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      centerId: undefined,
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @returns {*} set value of props to center on initial render
   */
  componentWillMount() {
    this.setState({
      centerId: this.props.centerId
    });
  }

  /**
   *
   * @param {*} nextProps
   * @returns {*} to set state when props changes
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.centerId !== this.props.centerId) {
      console.log(nextProps.centerId);
      this.setState({
        centerId: nextProps.centerId
      });
    }
  }

  /**
   *
   * @param {*} event
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { deleteCenter } = this.props;
    deleteCenter(this.state.centerId);
  }

  /**
   * @returns {*} view fir delete prompt
   */
  render() {
    const { loading } = this.state;
    return (
      <div id="deleteCenter" className="modal">
        <div className="modal-content">
          <h4>Delete Center</h4>
          <h5>Are you sure you want to delete this center?</h5>
        </div>
        <div className="modal-footer">
          <button className=" modal-action modal-close waves-effect waves-green btn" onClick={this.onSubmit}>Confirm</button>
        </div>
      </div>
    );
  }
}

DeleteCenterModal.propTypes = propTypes;
DeleteCenterModal.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteCenter: centerAction.deleteCenter
}, dispatch);

export default connect(null, mapDispatchToProps)(DeleteCenterModal);
