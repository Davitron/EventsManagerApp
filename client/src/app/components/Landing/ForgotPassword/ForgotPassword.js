import React, { Component } from 'react';
import '../../../../App.css';

/**
 *
 */
class ForgotPassword extends Component {
  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    return (
        <main className='signup'>
        <center>
          <div className='section'></div>
          <h3 className='white-text'><b>Forgot Password</b></h3>
          <div className='container'>
            <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
              <div className={['col', 's12'].join(' ')}>
                <div className='row'>
                  <div className={['col', 's12'].join(' ')}>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input type='email' name='email' id='email' />
                    <label htmlFor='email'>Enter your email</label>
                  </div>
                </div>
                <br />
                <center>
                  <div className='row'>
                    <button className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}>
                      <i className="material-icons left">send</i>
                      Send Reset Link
                    </button>
                  </div>
                  <a href='signIn.html'>Back</a>
                </center>
              </div>
            </div>
          </div>
        </center>
        <div className='section'></div>
        <div className='section'></div>
      </main>
    );
  }
}

export default ForgotPassword;
