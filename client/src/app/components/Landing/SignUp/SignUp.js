import React, { Component } from 'react';
import '../../../../App.css';

/**
 *
 */
class SignUp extends Component {
  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    return (
        <main className='signup'>
        <center>
          <div className='section'></div>
          <h3 className='white-text'><b>REGISTER</b></h3>
          <div className='container'>
            <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
              <div className={['col', 's12'].join(' ')}>
                <div className='row'>
                  <div className={['col', 's12'].join(' ')}>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input className='v' type='email' name='email' id='email' />
                    <label htmlFor='email'>Email</label>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's12'].join(' ')}>
                    <input className='v' type='text' name='username' id='username' />
                    <label htmlFor='username'>Username</label>
                  </div>
                </div>
                <div className='row'>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input className='' type='password' name='password' id='password' />
                    <label htmlFor='password'>Pasword</label>
                  </div>
                  <div className={['input-field', 'col', 's6'].join(' ')}>
                    <input className='v' type='text' name='confirmPassword' id='confirmPassword' />
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                  </div>
                </div>
                <br />
                <center>
                  <div className='row'>
                    <button className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}>Create Account</button>
                  </div>
                  <a href='signIn.html'>Already a User?</a>
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

export default SignUp;
