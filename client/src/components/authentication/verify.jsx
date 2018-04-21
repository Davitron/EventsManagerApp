import React from 'react';
import { Row, Col } from 'react-materialize';


/**
 * @param {*} props
 * @returns {*} rerurs view for landing page
 */
const VerifyEmail = props => (
  <div className="home">
    <div className={['banner', 'container', 'animated', 'bounceInUp'].join(' ')}>
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

// VerifyEmail.propTypes = {
//   location: PropTypes.objectOf(() => null).isRequired
// };

export default VerifyEmail;
