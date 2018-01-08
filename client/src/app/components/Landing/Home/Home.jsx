import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-materialize';
import '../../../../App.css';

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
          <Link to="/signin" className={['btn', 'btn-large', 'waves-effect'].join(' ')}>SignIn</Link>
          <Link to="/signup" className={['btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>SignUp</Link>
        </Row>
        <Row className="center">
          <Button waves="light" large className={['orange', 'animated', 'bounceInUp'].join(' ')}>View Upcoming Events</Button>
        </Row>
      </div>
    </div>
  );


export default Home;
