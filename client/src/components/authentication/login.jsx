import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Input, Row, Container } from 'react-materialize';
import { Grid, Button, Form } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Loader from '../reusables/loader';
import Header from '../header';
import Toast from '../../helpers/toast';
import FormValidator from '../../helpers/form-validator';
import UserActions from '../../actions/user-actions';
import AuthChecker from '../../helpers/auth-checker';
import history from '../../helpers/history';


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
  * @returns {void}
  */
  componentWillMount() {
    if (AuthChecker.checkUserAuth()) {
      history.push('/center-search');
    }
  }

  /**
  * @param {object} event
  *
  * @returns {void}
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
   * @returns {void}
   *
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
      authUser(this.state.user);
    }
  }


  /**
   *@returns {void} view htmlFor langing page
   */
  render() {
    const { user } = this.state; // eslint-disable-line
    const { stateProps } = this.props; // eslint-disable-line
    return (
      <div>
        <Header />
        <div className="home">
          <main className="section__hero" id="index-banner">
            {/* <div className="section" />
              <h4 className="white-text title"><b>Login</b></h4> */}
            <Grid centered columns={4}>
              <Grid.Column color="white">
                {/* <Image src='/assets/images/wireframe/image.png' /> */}
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input fluid label="First name" placeholder="First name" />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input fluid label="First name" placeholder="First name" />
                  </Form.Group>
                  <Button type="submit">Submit</Button>
                  <Button type="submit">Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
            {/* <Container>
              <form name="singInForm" onSubmit={this.onSubmit}>
                <div className="z-depth-1 grey lighten-4 row App-signup animated bounceInRight" >
                  {stateProps.status === 'authenticating' && <Loader />}
                  <div className={['col', 's12'].join('')}>
                    <Row>
                      <Input s={12}
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={this.onChange}
                        label="Email" />
                    </Row>
                    <Row>
                      <Input s={12}
                       name="password"
                       type="password"
                       value={user.paswword}
                       label="Password"
                       onChange={this.onChange} />
                      <label htmlFor="forgot" style={{ float: 'right' }}>
                        <Link
                          id="forgot"
                          to="/forgot-password"
                          className="red-text"
                          href="#!"><b>Forgot Password?</b></Link>
                      </label>
                    </Row>
                    <br />
                    <center>
                      <Row>
                        <button
                          type="submit"
                          className="col s12 btn btn-large waves-effect action-button"
                          disabled={!user.email || !user.password}
                          onClick={this.onSubmit}
                        >
                          Login
                        </button>
                      </Row>
                      <Row>
                        <Link
                          className="col s12 btn btn-large waves-effect red"
                          to="/register"
                        >
                          Create Account
                        </Link>
                      </Row>
                    </center>
                  </div>
                </div>
              </form>
            </Container> */}
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
