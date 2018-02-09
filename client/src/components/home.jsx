import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';


/**
 * @param {*} props
 * @returns {*} Home
 */
const Home = props =>
  /**
   *@returns {*} view for langing page
   */
  (
    <div className="App-main">
      <div className={['landing', 'container', 'animated', 'bounceInUp'].join(' ')}>
        <Row className="center">
          <h3>
            <Col s={12} className={['light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <b>Welcome to <b>EventManager.</b><br />
                The perfect meeting point for event centers and event planners
              </b>
            </Col>
          </h3>
        </Row>
        <Row className="center">
          <Link to="/login" className={['btn', 'btn-large', 'waves-effect'].join(' ')}>SignIn</Link>
          <Link to="/register" className={['btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>SignUp</Link>
        </Row>
        <Row className="center">
          <Link to="/centers" className={['waves-effect', 'orange', 'animated', 'bounceInUp', 'btn', 'btn-large'].join(' ')}>Continue as guest</Link>
        </Row>
      </div>
    </div>
  );


export default Home;
