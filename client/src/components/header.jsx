import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AuthChecker from '../helpers/auth-checker';
import UserActions from '../actions/user-actions';


/**
 *
 */
class Header extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: undefined, // eslint-disable-line
      navClassName: 'navigator', // eslint-disable-line
      sideNavStyle: { width: '0px' },
      currentRole: null
    };
    this.logOut = this.logOut.bind('this');
    this.navCLick = this.navCLick.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
  }

  /**
   *@returns{*} authentication status
   */
  componentWillMount() {
    const role = AuthChecker.defineRole();
    this.setState({ currentRole: role });
  }

  /**
   *@returns{*} authentication status
   */
  logOut() {
    UserActions.logout();
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
   *@returns {*} view for langing page
   */
  render() {
    const { navClassName, sideNavStyle, currentRole } = this.state;
    return (
      <header style={{ zIndex: '1' }}>
        <nav>
          <div className={navClassName} id="navigator">
            <NavLink to="/" target="">Evento</NavLink>
            <div className="nav-menu" style={{ float: 'right' }}>
              { !currentRole && <NavLink to="/login" target="">Login</NavLink> }
              { !currentRole && <NavLink to="/register" target="">Register</NavLink> }
              { currentRole && <NavLink to="/events" target="">My Events</NavLink> }
              { currentRole && <NavLink to="/centers" target="">Centers</NavLink> }
            </div>
            <a className="icon" onClick={this.navCLick}>&#9776;</a>
          </div>
          <div id="mySidenav" className="sidenav" style={sideNavStyle}>
            <a className="closebtn" onClick={this.closeSideNav}>&times;</a>
            { !currentRole && <NavLink to="/login" target="">Login</NavLink> }
            { !currentRole && <NavLink to="/register" target="">Register</NavLink> }
            { currentRole && <NavLink to="/events" target="">My Events</NavLink> }
            { currentRole && <NavLink to="/centers" target="">Centers</NavLink> }
          </div>
        </nav>
      </header>
    );
  }
}


export default Header;
