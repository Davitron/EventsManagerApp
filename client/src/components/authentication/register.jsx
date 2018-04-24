import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Container } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../reusables/loader';
import Header from '../header';
import FormValidator from '../../helpers/form-validator';
import Toast from '../../helpers/toast';
import UserActions from '../../actions/user-actions';


/**
 * @class
 *
 */
class Register extends Component {
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
      errors: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const fv = new FormValidator();
    const { createUser } = this.props;
    const errors = fv.validateSignUp(this.state.user);
    if (errors) {
      this.setState({
        errors
      }, () => {
        const message = Object.values(this.state.errors).join('\n');
        Toast.error(message);
      });
    } else {
      // Logger.log(createUser);
      createUser(this.state.user);
    }
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
          <main className="signup section__hero">
            <center>
              <div className="section" />
              <h4 className="white-text title"><b>REGISTER</b></h4>
              <Container>
                <form>
                  <Row className="z-depth-1 grey lighten-4 App-signup animated bounceInRight">
                    {stateProps.status === 'creating' && <Loader />}
                    <Row>
                      <Input s={12} name="email" type="email" value={user.email} onChange={this.onChange} label="Email" />
                    </Row>
                    <Row>
                      <Input s={12} name="username" value={user.username} label="Username" onChange={this.onChange} />
                    </Row>
                    <Row>
                      <Input s={6} name="password" type="password" value={user.paswword} label="Password" onChange={this.onChange} />
                      <Input s={6} name="confirmPassword" type="password" value={user.confirmPassword} label="Confirm Password" onChange={this.onChange} />
                    </Row>
                    <br />
                    <center>
                      <div className="row">
                        <button
                          type="submit"
                          className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'action-button'].join(' ')}
                          onClick={this.onSubmit}
                          disabled={
                            !user.email ||
                            !user.username ||
                            !user.password ||
                            !user.confirmPassword
                          }
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="row">
                        <Link className={['col', 's12', 'btn', 'btn-large', 'waves-effect', 'red'].join(' ')} to="/login">Already a User?</Link>
                      </div>
                    </center>
                  </Row>
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

const mapStateToProps = state => ({ stateProps: state.register });

const mapDispatchToProps = dispatch => bindActionCreators({
  createUser: UserActions.register
}, dispatch);

Register.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  createUser: PropTypes.func
};

Register.defaultProps = {
  stateProps: {},
  createUser: UserActions.register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
