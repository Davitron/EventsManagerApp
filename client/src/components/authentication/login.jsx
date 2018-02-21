import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Container } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../reusables/loader';
import Header from '../header';
import Toast from '../../helpers/toast';
import FormValidator from '../../helpers/form-validator';
import UserActions from '../../actions/user-actions';


/**
 * @returns {*} Component for SignUp
 */
class Login extends Component {
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
    event.preventDefault();
    const fv = new FormValidator();
    const { authUser } = this.props;
    const errors = fv.validateSignIn(this.state.user);
    if (errors) {
      this.setState({
        errors
      }, () => {
        const message = Object.values(this.state.errors).join('\n');
        Toast.error(message);
      });
    } else {
      // Logger.log(createUser);
      authUser(this.state.user);
    }
    // const { authUser } = this.props;
    // authUser(this.state.user);
  }


  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    const { user } = this.state;
    const { stateProps } = this.props;
    return (
      <div>
        <Header />
        <div className="home">
          <main className="signin">
            <center>
              <div className="section" />
              <h4 className="white-text title"><b>Login</b></h4>
              <Container>
                <form name="singInForm" onSubmit={this.onSubmit}>
                  <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
                    {stateProps.status === 'authenticating' && <Loader />}
                    <div className={['col', 's12'].join('')}>
                      <Row>
                        <Input s={12} name="email" type="email" value={user.email} onChange={this.onChange} label="Email" />
                      </Row>
                      <Row>
                        <Input s={12} name="password" type="password" value={user.paswword} label="Password" onChange={this.onChange} />
                        <label htmlFor="forgot" style={{ float: 'right' }}>
                          <Link id="forgot" to="/forgot-password" className="red-text" href="#!"><b>Forgot Password?</b></Link>
                        </label>
                      </Row>
                      <br />
                      <center>
                        <Row>
                          <button
                            type="submit"
                            className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}
                            disabled={!user.email || !user.password}
                            onClick={this.onSubmit}
                          >
                            Login
                          </button>
                        </Row>
                        <Row>
                          <Link className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')} to="/register">Create Account</Link>
                        </Row>
                      </center>
                    </div>
                  </div>
                </form>
              </Container>
            </center>
            <div className="section" />
            <div className="section" />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ stateProps: state.login });

const mapDispatchToProps = dispatch => bindActionCreators({
  authUser: UserActions.login
}, dispatch);

Login.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  authUser: PropTypes.func
};

Login.defaultProps = {
  stateProps: {},
  authUser: UserActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
