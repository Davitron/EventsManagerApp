import React, { Component } from 'react';
import '../../../../App.css';

/**
 *
 */
class SignIn extends Component {
  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    return (
        <main className='signup'>
        <center>
          <div className='section'></div>
          <h3 className='white-text'><b>Login</b></h3>
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
                    <label htmlFor='email'>Email</label>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input type='password' name='password' id='password' />
                    <label htmlFor='password'>Password</label>
                  </div>
                  <label style={{float: 'right'}}>
                    <a className='red-text' href='#!'><b>Forgot Password?</b></a>
                  </label>
                </div>
                <br />
                <center>
                  <div className='row'>
                    <button className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}>Login</button>
                  </div>
                  <a href='signIn.html'>Create an account</a>
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

export default SignIn;
