import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Row, Container } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../reusables/loader';
import Header from '../header';


/**
 * @returns {*} Component for SignUp
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

  }


  /**
   *@returns {*} view htmlFor langing page
   */
  render() {
    return (
      <div>
        <Header />
        <div className="App-main">
          <main className="signup">
            <center>
              <div className="section" />
              <h4 className="white-text"><b>REGISTER</b></h4>
              <Container>
                <form>
                  <Row className="z-depth-1 grey lighten-4 App-signup animated bounceInRight">
                  {/* {stateProps.creating === true && <Loader />} */}
                    <Row>
                      <Input s={12} name="email" type="email" value="" label="Email" />
                    </Row>
                    <Row>
                      <Input s={12} name="username" value="" label="Username" />
                    </Row>
                    <Row>
                      <Input s={6} name="password" type="password" value="" label="Password" />
                      <Input s={6} name="confirmPassword" type="password" value="" label="Confirm Password" />
                    </Row>
                    <br />
                    <center>
                      <div className="row">
                        <button
                          type="submit"
                          className={['col', 's12', 'btn', 'btn-large', 'waves-effect'].join(' ')}
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

Register.propTypes = {
  stateProps: PropTypes.objectOf(() => null),
  dispatch: PropTypes.func.isRequired
};

Register.defaultProps = {
  stateProps: {}
};

export default connect(mapStateToProps)(Register);
