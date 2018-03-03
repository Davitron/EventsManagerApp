import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserActions from '../../actions/user-actions';
import Logger from '../../helpers/logger';


/**
 *
 */
class VerifiedEmail extends Component {
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
    Logger.log(nextProps);
    if (nextProps.stateProps !== this.props.stateProps) {
      this.setState({
        message: nextProps.stateProps.data
      }, () => {
        Logger.log(this.state.message);
      });
    }
  }
  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <div className="home">
        <div className={['banner', 'container', 'animated', 'bounceInUp'].join(' ')}>
          <Row className="center">
            <Col s={12} className={['light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <h3 className="title"> <b>{this.state.message}</b><br /></h3>
            </Col>
          </Row>
          <Row className="center"> <Link className={['btn', 'btn-large', 'waves-effect', 'blue'].join(' ')} to="/">Continue as user</Link></Row>
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
