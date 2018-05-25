import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Modal } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormValidator from '../../helpers/form-validator';
import UserActions from '../../actions/user-actions';


/**
 * @class
 *
 */
export class ForgotPassword extends Component {
/**
 *
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
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
 * @param {object} event
 *
 * @returns {void}
 *
 *this handles the event when any property in the state changes
 */
  onChange(event) {
    const { value } = event.target;
    this.setState({
      user: {
        email: value
      },
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
    this.setState({ isLoading: true, isDisabled: true, serverError: '' });
    const fv = new FormValidator();
    const { requestReset } = this.props;
    const errors = fv.validatePasswordReset(this.state.user);
    if (errors) {
      this.setState({ errors, isLoading: false, isDisabled: false });
    } else {
      requestReset(this.state.user);
    }
  }

  /**
   * @returns {void}
   */
  closeAlert() {
    this.setState({ showAlert: false });
  }


  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    const { user, isLoading, errors, isDisabled, serverError, showAlert, serverSuccess } = this.state; // eslint-disable-line
    return (
      <div>
        {/* <Header /> */}
        <div className="home">
          <main className="section__hero" id="index-banner">
            <div className="my-container">
              <div className="form-container">
                <form name="singInForm" onSubmit={this.onSubmit}>
                  <h3>Forgot Password</h3>
                  <div className="App-signup animated bounceInRight" style={{ padding: '12px', paddingTop: '30px', paddingBottom: '20px' }} >
                    <div style={{ textAlign: 'center' }}><span style={{ color: 'red' }}>{ serverError && serverError }</span></div>
                    <span style={{ color: 'red', paddingBottom: '4px' }}>{errors.email && errors.email[0]}</span>
                    <Input fluid icon="at" placeholder="email" onChange={this.onChange} name="email" />
                    <br />
                    <Button color="facebook" fluid loading={isLoading} disabled={isDisabled}>Send Reset Link</Button>
                    <br />
                    <span>Back to<Link style={{ color: 'white !important' }} to="/"> home</Link></span>
                  </div>
                </form>
              </div>
            </div>
            <div className="section" />
            <div className="section" />
            <Modal size="tiny" open={showAlert} onClose={this.close}>
              <Modal.Header>
                Password Reset Link
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

const mapStateToProps = state => ({ response: state.forgotPassword });

const mapDispatchToProps = dispatch => bindActionCreators({
  requestReset: UserActions.resetRequest
}, dispatch);

ForgotPassword.propTypes = {
  response: PropTypes.objectOf(() => null),
  requestReset: PropTypes.func
};

ForgotPassword.defaultProps = {
  response: {},
  requestReset: UserActions.resetRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
