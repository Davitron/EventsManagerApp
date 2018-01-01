import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserActions from '../../../../actions/user.action';
import '../../../../App.css';

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
      payload: null
    };
  }
  /**
   *@returns {*} makes ajax call befor render
   */
  componentWillMount() {
    const userActions = new UserActions();
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const token = param.get('token');
    this.props.dispatch(userActions.completeRegistration(token));
  }
  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <div className="App-main">
        <div className={['landing', 'container', 'animated', 'bounceInUp'].join(' ')}>
          <Row className='center'>
              <Col s={12} className={['light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <h3> <b>Your email has been veriried</b><br /></h3>
              </Col>
          </Row>
          <Row className='center'> <Link className={['btn', 'btn-large', 'waves-effect', 'blue'].join(' ')} to='/'>Continue as user</Link></Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateProps: state.userVerification
  };
};

export default connect(mapStateToProps)(VerifiedEmail);
