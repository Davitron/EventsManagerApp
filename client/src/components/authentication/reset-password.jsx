import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import FormValidator from '../../helpers/form-validator';
import history from '../../helpers/history';
import Header from '../header';
import UserActions from '../../actions/user-actions';

/**
 * @returns {*} Component for SignUp
 */
class ResetPassword extends Component {
/**
 *
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: '',
        confirmPassword: '',
      },
      isLoading: false,
      isDisabled: false,
      serverError: '',
      serverSuccess: '',
      errors: {},
      showAlert: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }


  /**
   *
   * @param {*} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { serverError } = this.state;
    const { data, status } = nextProps.response;
    if (serverError !== data && status === 'success') {
      this.setState({
        serverSuccess: data,
        isLoading: false,
        isDisabled: false,
        showAlert: true
      });
    } else {
      this.setState({
        serverError: data,
        isLoading: false,
        isDisabled: false,
      });
    }
  }

  /**
 * @param {*} event
 *
 * @returns {*}
 *
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
   * @param {object} event
   *
   * @returns {*}
   *
   * this handles the event when form is submitted
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true, isDisabled: true, serverError: '' });
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const token = param.get('token');
    const fv = new FormValidator();
    const { resetPassword } = this.props;
    const { user } = this.state;
    const errors = fv.validateInput(user);
    if (errors) {
      this.setState({ errors, isLoading: false, isDisabled: false });
    } else {
      const request = { password: user.password, confirmPassword: user.confirmPassword, token };
      resetPassword(request);
    }
  }

  /**
   * @returns {void}
   */
  closeAlert() {
    this.setState({ showAlert: false });
    history.push('/login');
  }


  /**
   *@returns {view} view htmlFor langing page
   */
  render() {
    const { user, isLoading, errors, isDisabled, serverError, showAlert, serverSuccess } = this.state; // eslint-disable-line
    return (
      <div>
        <Header />
        <div className="home">
          <main className="section__hero" id="index-banner">
            <div className="my-container">
              <div className="form-container">
                <form name="singInForm" onSubmit={this.onSubmit}>
                  <h3>Login</h3>
                  <div className="App-signup animated bounceInRight" style={{ padding: '12px', paddingTop: '30px', paddingBottom: '20px' }} >
                    <div style={{ textAlign: 'center' }}><span style={{ color: 'red' }}>{ serverError && serverError }</span></div>
                    <span style={{ color: 'red', paddingBottom: '4px' }}>{errors.password && errors.password[0]}</span>
                    <Input fluid icon="lock" type="password" placeholder="password" onChange={this.onChange} name="password" />
                    <br />
                    <span style={{ color: 'red' }}>{errors.confirmPassword && errors.confirmPassword[0]}</span>
                    <Input fluid icon="lock" type="password" placeholder="confirm password" onChange={this.onChange} name="confirmPassword" />
                    <span><Link style={{ textAlign: 'right' }} to="/forgot-password">Forgot Password</Link></span><br />
                    <br />
                    <Button color="facebook" fluid loading={isLoading} disabled={isDisabled}>login</Button>
                    <br />
                    <span>New Here? <Link style={{ color: 'white !important' }} to="/register">Create an account</Link></span>
                  </div>
                </form>
              </div>
            </div>
            <div className="section" />
            <div className="section" />
            <Modal size="tiny" open={showAlert} onClose={this.close}>
              <Modal.Header>
                Password Reset Sucessfull
              </Modal.Header>
              <Modal.Content>
                <p>{serverSuccess}</p>
              </Modal.Content>
              <Modal.Actions>
                <Button color="facebook" icon="checkmark" labelPosition="right" content="OK" onClick={this.closeAlert} />
              </Modal.Actions>
            </Modal>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ response: state.resetPassword });

const mapDispatchToProps = dispatch => bindActionCreators({
  resetPassword: UserActions.resetPassword
}, dispatch);

ResetPassword.propTypes = {
  response: PropTypes.objectOf(() => null),
  resetPassword: PropTypes.func
};

ResetPassword.defaultProps = {
  response: {},
  resetPassword: UserActions.resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
