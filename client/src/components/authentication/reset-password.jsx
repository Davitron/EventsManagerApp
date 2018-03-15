import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Container, Icon } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../reusables/loader';
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
      token: ''
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
    const { resetPassword } = this.props;
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const token = param.get('token');
    this.setState({
      token
    }, () => {
      const password = this.state.user;
      password.token = this.state.token;
      resetPassword(password);
    });
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
              <h4 className="white-text"><b>Reset Password</b></h4>
              <Container>
                <form>
                  <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
                    {stateProps.status === 'ongoing' && <Loader />}
                    <div className={['col', 's12'].join('')}>
                      <Row>
                        <Input s={12} name="password" type="password" value={user.password} onChange={this.onChange} label="Enter new password" />
                      </Row>
                      <Row>
                        <Input s={12} name="confirmPassword" type="password" value={user.confirmPassword} onChange={this.onChange} label="Confirm password" />
                        <label htmlFor="forgot" style={{ float: 'right' }}>
                          <Link id="forgot" to="#!" className="white-text" href="#!">blank</Link>
                        </label>
                      </Row>
                      <br />
                      <center>
                        <Row>
                          <button onClick={this.onSubmit} disabled={!user.password || !user.confirmPassword} className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'action-button'].join(' ')}>
                              Reset Password
                          </button>
                        </Row>
                        <Row>
                          <Link className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')} to="/login">Back</Link>
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

const mapStateToProps = state => ({ stateProps: state.resetPassword });

const mapDispatchToProps = dispatch => bindActionCreators({
  resetPassword: UserActions.resetPassword
}, dispatch);

ResetPassword.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  resetPassword: PropTypes.func
};

ResetPassword.defaultProps = {
  stateProps: {},
  resetPassword: UserActions.resetPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
