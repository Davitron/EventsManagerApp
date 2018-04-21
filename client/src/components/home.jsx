import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import AuthChecker from '../helpers/auth-checker';
import history from '../helpers/history';

/**
 *
 */
class Home extends Component {
  /**
   * @returns {void}
   */
  componentWillMount() {
    if (AuthChecker.checkUserAuth()) {
      history.push('/center-search');
    }
  }

  /**
   * @returns {*} view
   */
  render() {
    return (
      <div>
        <Header />
        <div className="home">
          <div>

            <div className="section section__hero" id="index-banner">
              <div className="container">
                <div className="banner row">
                  <div className="col s12 m7 animated fadeInUp">
                    <h1 className="header title">EventManager</h1>
                    <h5 className="header white-text title">The perfect meeting point for event centers and event planners</h5>
                  </div>
                </div>
                <div className="row center">
                  <Link to="/center-search" className={['waves-effect', 'orange', 'animated', 'fadeInUp', 'btn', 'btn-large'].join(' ')}>Continue as guest</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
