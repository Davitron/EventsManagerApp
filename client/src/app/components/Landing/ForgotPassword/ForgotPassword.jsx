import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../../App.css';

/**
 *
 */
class ForgotPassword extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    const { email } = this.state;
    return (
      <div className="App-main">
        <main className="signup">
          <center>
            <div className="section" />
            <h3 className="white-text">Send Email</h3>
            <div className="container">
              <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
                <div className={['col', 's12'].join(' ')}>
                  <div className="row">
                    <div className={['col', 's12'].join(' ')} />
                  </div>
                  <div className="row">
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input type="email" name="email" value={email} id="email" />
                      <label htmlFor="email">Enter your email</label>
                    </div>
                  </div>
                  <br />
                  <center>
                    <div className="row">
                      <Link to="/" className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}>
                        <i className="material-icons left">send</i>
                          Send Reset Link
                      </Link>
                    </div>
                    <div className="row">
                      <Link className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')} to="/signin">Back to home</Link>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </center>
          <div className="section" />
          <div className="section" />
        </main>
      </div>
    );
  }
}

export default ForgotPassword;
