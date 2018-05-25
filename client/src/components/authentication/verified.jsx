import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../../actions/user-actions';

/**
 *
 */
export class VerifiedEmail extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  /**
   *@returns {*} makes ajax call befor render
   */
  componentWillMount() {
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const token = param.get('token');
    this.props.dispatch(UserActions.completeRegistration(token));
  }

  /**
  *
  *@param {*} nextProps
  *@returns {*} re-renders component on props chagne
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.stateProps.data
    });
  }
  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <div>
        {/* <Header /> */}
        <div className="home">
          <div className="section section__hero" style={{ color: 'white' }}>
            <div className="my-container" style={{ paddingTop: '8em' }}>
              <h2 className="animated fadeInUp">{this.state.message}</h2>
              <h3 style={{ paddingBottom: '60px' }} className="animated fadeInUp"><Link to="/login">Proceed to login</Link></h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ stateProps: state.completeRegistration });

VerifiedEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stateProps: PropTypes.objectOf(() => null)
};

VerifiedEmail.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps)(VerifiedEmail);
