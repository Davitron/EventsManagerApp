import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserActions from '../../../../actions/user.action';
import '../../../../App.css';

/**
 *
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
      },
      submitted: false
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


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.dispatch(userActions.signUp(this.state.user));
  }


  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
        <main className='signup'>
        <center>
          <div className='section'></div>
          <h3 className='white-text'><b>REGISTER</b></h3>
          <div className='container'>
            <form name='signUpForm' onSubmit={this.onSubmit}>
              <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
                <div className={['col', 's12'].join(' ')}>
                  <div className='row'>
                    <div className={['col', 's12'].join(' ')}>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input className='' type='email' name='email' value={user.email} id='email' onChange={this.onChange} />
                      <label htmlFor='email'>Email</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's12'].join(' ')}>
                      <input className='' type='text' name='username' value={user.username} id='username' onChange={this.onChange} />
                      <label htmlFor='username'>Username</label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input className='' type='password' name='password' value={user.password} id='password' onChange={this.onChange} />
                      <label htmlFor='password'>Pasword</label>
                    </div>
                    <div className={['input-field', 'col', 's6'].join(' ')}>
                      <input className='' type='password' name='confirmPassword' value={user.confirmPassword} id='confirmPassword' onChange={this.onChange} />
                      <label htmlFor='confirmPassword'>Confirm Password</label>
                    </div>
                  </div>
                  <br />
                  <center>
                    <div className='row'>
                      <button type='submit' className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}>Create Account</button>
                    </div>
                    <div className='row'>
                      <Link className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')} to='/signin'>Already a User?</Link>
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
    user: state.userCreation
  };
};

// const mapDispatchToProps = (dispatch) => {
//   const userActions = new UserActions();
//   return {
//     actions: bindActionCreators(userActions, dispatch)
//   };
// };

export default connect(mapStateToProps)(SignUp);
