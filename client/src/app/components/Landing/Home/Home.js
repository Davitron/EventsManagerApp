import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-materialize';
import '../../../../App.css';

/**
 *
 */
class Home extends Component {
  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <div className={['landing', 'container', 'animated', 'bounceInUp'].join(' ')}>
        <Row className='center'>
          <h3>
            <Col s={12} className={['light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
              <b>Welcome to <b>EventManager.</b><br />
              The perfect meeting point for event centers and event planners</b>
            </Col>
          </h3>
        </Row>
        <Row className='center'>
          <Button waves='light' large={true} className={['animated', 'bounceInLeft'].join(' ')}>SignIn</Button>
          <Button waves='light' large={true} className={['red', 'animated', 'bounceInRight'].join(' ')}>SignUp</Button>
        </Row>
        <Row className='center'>
          <Button waves='light' large={true} className={['orange', 'animated', 'bounceInUp'].join(' ')}>View Upcoming Events</Button>
        </Row>
      </div>
    );
  }
}

export default Home;
