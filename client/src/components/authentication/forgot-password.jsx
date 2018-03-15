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
class ForgotPassword extends Component {
/**
 *
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
      }
    }
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
        email: value
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
    const { requestReset } = this.props;
    requestReset(this.state.user);
    this.setState({
      user: {
        email: ''
      }
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
        <div className="App-main">
          <main className="signin">
            <center>
              <div className="section" />
              <h4 className="white-text"><b>Forgot Password</b></h4>
              <Container>
                <form>
                  <div className={['z-depth-1', 'grey', 'lighten-4', 'row', 'App-signup', 'animated', 'bounceInRight'].join(' ')} >
                    {stateProps.status === 'ongoing' && <Loader />}
                    <div className={['col', 's12'].join('')}>
                      <Row>
                        <Input s={12} name="email" type="email" value={user.email} onChange={this.onChange} label="Enter your email" />
                        <label htmlFor="forgot" style={{ float: 'right' }}>
                          <Link id="forgot" to="#!" className="white-text" href="#!">blank</Link>
                        </label>
                      </Row>
                      <br />
                      <center>
                        <Row>
                          <button onClick={this.onSubmit} className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'action-button'].join(' ')}>
                              Send Reset Link
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
  requestReset: UserActions.resetRequest
}, dispatch);

ForgotPassword.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  requestReset: PropTypes.func
};

ForgotPassword.defaultProps = {
  stateProps: {},
  requestReset: UserActions.resetRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
