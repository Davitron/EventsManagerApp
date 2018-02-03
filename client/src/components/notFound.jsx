import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';


/**
 * @param {*} props
 * @returns {*} Home
 */
const NotFound = props =>
  /**
   *@returns {*} view for langing page
   */
  (
    <div>
      <div className={['landing', 'container', 'animated', 'bounceInUp'].join(' ')}>
        <Row className="center">
          <h1>
            <Col s={12} className={['light', 'black-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <b>
                404
              </b>
            </Col>
          </h1>
        </Row>
        <Row className="center">
          <h3>
            <Col s={12} className={['light', 'black-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <b>
                Page Not Found
              </b>
            </Col>
          </h3>
        </Row>
        <Row className="center">
          <Link to="/" className={['waves-effect', 'animated', 'bounceInUp', 'btn', 'btn-large'].join(' ')}>Return Home</Link>
        </Row>
      </div>
    </div>
  );


export default NotFound;
