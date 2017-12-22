import React, { Component } from 'react';
import { Row, Col, Button } from 'react-materialize';
import '../../../../App.css';

/**
 *
 */
class VerifyEmail extends Component {
  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <div className={['landing', 'container', 'animated', 'bounceInUp'].join(' ')}>
        <Row className='center'>
          <h3>
            <Col s={12} className={['light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <b>A verificaton link has been sent to your email address<br />
              Check your inbox to complete your registration.</b>
            </Col>
          </h3>
        </Row>
      </div>
    );
  }
}

export default VerifyEmail;
