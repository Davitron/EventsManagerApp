import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormValidator from '../../helpers/form-validator';
import UserActions from '../../actions/user-actions';

const cleanError = (errorText, badWord, cleanWord) => errorText.replace(badWord, cleanWord);
/**
 * @class
 *
 */
export class Register extends Component {
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
      serverError: '',
      isLoading: false,
      isDisabled: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   * @param {*} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { data, status } = nextProps.response;
    if (status === 'failed') {
      this.setState({ serverError: data, isLoading: false, isDisabled: false });
    } else if (status === 'created') {
      this.props.history.push('/verify');
    }
  }

  /**
 * @param {object} event
 *
 * @returns {void}
 * this handles the event when any property in the state changes
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
    this.setState({ isLoading: true, isDisabled: true });
    const fv = new FormValidator();
    const { createUser } = this.props;
    const errors = fv.validateSignUp(this.state.user);
    if (errors) {
      this.setState({ errors, isLoading: false, isDisabled: false });
    } else {
      createUser(this.state.user);
    }
  }


  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    const {
      isLoading,
      errors,
      isDisabled,
      serverError
    } = this.state;

    return (
      <div>
        {/* <Header /> */}
        <div className="home">
          <main className="section__hero" id="index-banner">
            <div className="my-container">
              <div className="form-container">
                <form name="singInForm" onSubmit={this.onSubmit}>
                  <h3>Register</h3>
                  <div className="App-signup animated bounceInRight" style={{ padding: '12px', paddingTop: '30px', paddingBottom: '20px' }} >
                    <div style={{ textAlign: 'center' }}><span style={{ color: 'red' }}>{ serverError && serverError }</span></div>
                    <span id="email" style={{ color: 'red' }}>{ errors.email && errors.email[0] }</span>
                    <Input fluid icon="at" placeholder="email" onChange={this.onChange} name="email" />
                    <br />
                    <span id="username" style={{ color: 'red' }}>{ errors.username && errors.username[0] }</span>
                    <Input fluid icon="user" placeholder="username" onChange={this.onChange} name="username" />
                    <br />
                    <span id="password" style={{ color: 'red' }}>{ errors.password && errors.password[0] }</span>
                    <Input fluid icon="lock" placeholder="password" type="password" onChange={this.onChange} name="password" />
                    <br />
                    <span id="confirmPassword" style={{ color: 'red', textAlign: 'left !important' }}>
                      { errors.confirmPassword && cleanError(errors.confirmPassword[0], 'confirmPassword', 'confirm password')}
                    </span>
                    <Input fluid icon="lock" placeholder="confirm password" type="password" onChange={this.onChange} name="confirmPassword" />
                    <br />
                    <Button color="facebook" loading={isLoading} disabled={isDisabled} fluid>Register</Button>
                    <br />
                    <span id="to-login">Already have an account? <Link style={{ color: 'white !important' }} to="/login">Login</Link></span>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ response: state.register });

const mapDispatchToProps = dispatch => bindActionCreators({
  createUser: UserActions.register
}, dispatch);

Register.propTypes = {
  response: PropTypes.objectOf(() => null),
  history: PropTypes.objectOf(() => null).isRequired,
  createUser: PropTypes.func
};

Register.defaultProps = {
  response: {},
  createUser: UserActions.register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
