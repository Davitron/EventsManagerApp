import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserActions from '../actions/user-actions';


/**
 *
 */
export class Header extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: undefined, // eslint-disable-line
      navClassName: 'navigator', // eslint-disable-line
      sideNavStyle: { width: '0px' }
    };
    this.logOut = this.logOut.bind(this);
    this.navCLick = this.navCLick.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
    this.renderNavigation = this.renderNavigation.bind(this);
  }


  /**
   *@returns{*} authentication status
   */
  logOut() {
    const { logout } = this.props;
    logout();
  }

  /**
   * @returns {void}
   *
   */
  navCLick() {
    const { navClassName } = this.state;
    if (navClassName === 'navigator') {
      this.setState({
        navClassName: 'navigator responsive',
        sideNavStyle: { width: '250px' }
      });
    } else {
      this.setState({
        navClassName: 'navigator',
        sideNavStyle: { width: '0px' }
      });
    }
  }

  /**
   * @returns {void}
   *
   */
  closeSideNav() {
    this.setState({ navClassName: 'navigator', sideNavStyle: { width: '0px' } });
  }

  /**
   * @returns {void}
   *
   */
  renderNavigation() {
    const { response: { currentUser } } = this.props;
    if (!currentUser.isAuthenticated) {
      return (
        <div className="nav-menu" style={{ float: 'right' }}>
          <NavLink className="login" to="/login" target="">Login</NavLink>
          <NavLink className="register" to="/register" target="">Register</NavLink>
        </div>
      );
    }
    return (
      <div className="nav-menu" style={{ float: 'right' }}>
        <NavLink className="events" to="/events" target="">My Events</NavLink>
        <NavLink className="centers" to="/centers" target="">Centers</NavLink>
        <a href="#!" onClick={this.logOut}>Logout</a>
      </div>
    );
  }

  /**
   *@returns {*} view for langing page
   */
  render() {
    const { response: { currentUser } } = this.props;
    const { navClassName, sideNavStyle } = this.state;
    return (
      <header style={{ zIndex: '1' }}>
        <nav>
          <div className={navClassName} id="navigator">
            <NavLink to="/" target="">Evento</NavLink>
            {this.renderNavigation()}
            <a className="icon" onClick={this.navCLick}>&#9776;</a>
          </div>
          <div id="mySidenav" className="sidenav" style={sideNavStyle}>
            <a className="closebtn" onClick={this.closeSideNav}>&times;</a>
            { !currentUser.isAuthenticated && <NavLink to="/login" target="">Login</NavLink> }
            { !currentUser.isAuthenticated && <NavLink to="/register" target="">Register</NavLink> }
            { currentUser.isAuthenticated && <NavLink to="/events" target="">My Events</NavLink> }
            { currentUser.isAuthenticated && <NavLink to="/centers" target="">Centers</NavLink> }
            { currentUser.isAuthenticated && <a href="#!" onClick={this.logOut}>Logout</a> }
          </div>
        </nav>
      </header>
    );
  }
}


const mapStateToProps = state => ({
  response: {
    currentUser: state.login
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: UserActions.logout
}, dispatch);

Header.propTypes = {
  response: PropTypes.objectOf(() => null).isRequired,
  logout: PropTypes.func
};

Header.defaultProps = {
  logout: UserActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
