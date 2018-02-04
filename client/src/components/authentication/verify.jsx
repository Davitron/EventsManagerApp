import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';
import Logger from '../../helpers/logger';

/**
 * @param {*} props
 * @returns {*} rerurs view for landing page
 */
const VerifyEmail = (props) => {
  const { message } = props.location.state;
  return (
    <div className="App-main">
      <div className={['landing', 'container', 'animated', 'bounceInUp'].join(' ')}>
        <Row className="center">
          <h3>
            <Col s={12} className={['light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <b>A verificaton link has been sent to your email address<br />
              Check your inbox to complete your registration.
              </b>
            </Col>
          </h3>
        </Row>
      </div>
    </div>
  );
};

VerifyEmail.propTypes = {
  location: PropTypes.objectOf(() => null).isRequired
};

export default VerifyEmail;
