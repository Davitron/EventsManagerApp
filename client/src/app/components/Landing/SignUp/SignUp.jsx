import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../Loader/Loader';
import UserActions from '../../../../actions/user.action';
import '../../../../App.css';

/**
 * @returns {*} Component for SignUp
 */
class SignUp extends Component {
/**
 *
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
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

    // const { user } = this.state;
    // const { dispatch } = this.props;
    this.props.dispatch(userActions.signUp(this.state.user));
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
      message = Object.values(stateProps.error.errors).join('\n');
    } else {
      message = stateProps.error;
    }
    this.msg.show(message, {
      time: 5000,
      type: 'error',
      icon: <i className="material-icons">cancel</i>,
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
      <div className="App-main">
        <main className="signup">
          {!stateProps.error ? '' : this.showAlert()}
          <center>
            <div className="section" />
            <h3 className="white-text"><b>REGISTER</b></h3>
            <div className="container">
              {stateProps.error !== null &&
                <AlertContainer ref={(a) => { this.msg = a; }} {...this.alertOptions} />
              }
              <form name="signUpForm" onSubmit={this.onSubmit}>
                <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
                  {stateProps.creating === true && <Loader />}
                  <div className={['col', 's12'].join(' ')}>
                    <div className="row">
                      <div className={['col', 's12'].join(' ')} />
                    </div>
                    <div className="row">
                      <div className={['input-field', 'col', 's12'].join(' ')}>
                        <input className="" type="email" name="email" value={user.email} id="email" onChange={this.onChange} />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className={['input-field', 'col', 's12'].join(' ')}>
                        <input className="" type="text" name="username" value={user.username} id="username" onChange={this.onChange} />
                        <label htmlFor="username">Username</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className={['input-field', 'col', 's6'].join(' ')}>
                        <input className="" type="password" name="password" value={user.password} id="password" onChange={this.onChange} />
                        <label htmlFor="password">Pasword</label>
                      </div>
                      <div className={['input-field', 'col', 's6'].join(' ')}>
                        <input className="" type="password" name="confirmPassword" value={user.confirmPassword} id="confirmPassword" onChange={this.onChange} />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                      </div>
                    </div>
                    <br />
                    <center>
                      <div className="row">
                        <button
                          type="submit"
                          disabled={user.email.length <= 0 || user.password.length <= 6
                          || user.username.length < 3 || user.confirmPassword !== user.password}
                          className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="row">
                        <Link className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')} to="/signin">Already a User?</Link>
                      </div>
                    </center>
                  </div>
                </div>
              </form>
            </div>
          </center>
          <div className="section" />
          <div className="section" />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({ stateProps: state.userSignUp });

SignUp.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  dispatch: PropTypes.func.isRequired
};

SignUp.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps)(SignUp);
