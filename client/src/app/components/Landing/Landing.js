import React, { Component } from 'react';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import '../../../App.css';

/**
 *
 */
class Landing extends Component {
  /**
   *@returns {*} view for langding page
   */
  render() {
    return (
      <div className="App-main">
        <div id='landing'> </div>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default Landing;
