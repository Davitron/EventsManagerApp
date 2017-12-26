import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AlertContainer from 'react-alert';
import { bindActionCreators } from 'redux';
import Loader from '../../Loader/Loader';
import UserActions from '../../../../actions/user.action';
import '../../../../App.css';

/**
 *
 */
class SignIn extends Component {
/**
 *
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  *@param {*} event
  *@returns {*}
  *this handles the event when any property in the state changes
  */
  onChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  /**
   *
   * @param {*} event
   * @returns {*}
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    const userActions = new UserActions();
    event.preventDefault();

    this.setState({ submitted: true });
    // const { user } = this.state;
    // const { dispatch } = this.props;
    this.props.dispatch(userActions.signin(this.state.user));
  }

  alertOptions = {
    offset: 14,
    position: 'top center',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }

  showAlert = () => {
    const { stateProps } = this.props;
    let message;
    if (stateProps.error.errors) {
      message = Object.values(stateProps.error.errors).join(' ');
    } else {
      message = stateProps.error;
    }
    this.msg.show(message, {
      time: 5000,
      type: 'error',
      icon: <i className='material-icons'>cancel</i>,
      onClose: () => { stateProps.error = null; }
    });
  }

  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    const { user } = this.state;
    const { stateProps } = this.props;
    return (
      <main className='signup'>
        {!stateProps.error ? '' : this.showAlert()}
        <center>
          <div className='section'></div>
          <h3 className='white-text'><b>Login</b></h3>
          <div className='container'>
          {stateProps.error !== null &&
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          }
            <form name='singInForm' onSubmit={this.onSubmit}>
              <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
              {stateProps.authenticating === true && <Loader />}
                <div className={['col', 's12'].join(' ')}>
                  <div className='row'>
                    <div className={['col', 's12'].join(' ')}>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input type='email' name='email' value={user.email} id='email' onChange={this.onChange} />
                      <label htmlFor='email'>Email</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input type='password' name='password' value={user.password} id='password' onChange={this.onChange} />
                      <label htmlFor='password'>Password</label>
                    </div>
                    <label style={{float: 'right'}}>
                      <Link to='/forgotpassword' className='red-text' href='#!'><b>Forgot Password?</b></Link>
                    </label>
                  </div>
                  <br />
                  <center>
                    <div className='row'>
                      <button className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}
                      disabled={user.email.length <= 0 || user.password.length <= 6} onClick={this.onSubmit}>Login</button>
                    </div>
                    <div className='row'>
                      <Link to='/signup' className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>Create an account</Link>
                    </div>
                  </center>
                </div>
              </div>
            </form>
          </div>
        </center>
        <div className='section'></div>
        <div className='section'></div>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stateProps: state.userSignIn
  };
};

export default connect(mapStateToProps)(SignIn);
