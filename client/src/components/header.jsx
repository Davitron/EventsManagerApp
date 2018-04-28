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
      navs: [] // eslint-disable-line
    };
    this.logOut = this.logOut.bind('this');
    this.navCLick = this.navCLick.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
  }

  /**
   *@returns{*} authentication status
   */
  componentWillMount() {
    const authUser = AuthChecker.getUserDetails();
    this.setState({
      user: authUser // eslint-disable-line
    }, () => {
      // this.renderByRole();
    });
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

  // /**
  //  *@returns {*}
  //  *this will produce appropriate navabar menu for role
  //  */
  // renderByRole() {
  //   const { user } = this.state;
  //   let userName;
  //   if (user === null) {
  //     userName = '';
  //   } else {
  //     userName = user.username;
  //   }
  //   let items;
  //   const navByRoles = {
  //     unAuthUser: [
  //       {
  //         linkName: 'login',
  //         linkRef: '/login'
  //       },
  //       {
  //         linkName: 'register',
  //         linkRef: '/register'
  //       }
  //     ],
  //     user: [
  //       {
  //         linkName: userName,
  //         linkRef: ''
  //       },
  //       {
  //         linkName: 'My Events',
  //         linkRef: '/events'
  //       }
  //     ],
  //     admin: [
  //       {
  //         linkName: 'Admin',
  //         linkRef: ''
  //       },
  //       {
  //         linkName: 'Centers',
  //         linkRef: '/centers'
  //       },
  //       {
  //         linkName: 'My Events',
  //         linkRef: '/events'
  //       }
  //     ]
  //   };
  //   if (user && user.isVerified === true && user.isAdmin === false) {
  //     items = navByRoles.user
  //       .map((item, index) => (
  //         <li key={shortid.generate()}>
  //           <NavLink to={item.linkRef} target="">{item.linkName}</NavLink>
  //         </li>
  //       ));
  //   } else if (user && user.isVerified === true && user.isAdmin === true) {
  //     items = navByRoles.admin
  //       .map((item, index) => (
  //         <li key={shortid.generate()}>
  //           <NavLink to={item.linkRef} target="">{item.linkName}</NavLink>
  //         </li>
  //       ));
  //   } else {
  //     items = navByRoles.unAuthUser
  //       .map((item, index) => (
  //         <li key={shortid.generate()}>
  //           <NavLink to={item.linkRef} target="">{item.linkName}</NavLink>
  //         </li>
  //       ));
  //   }
  //   this.setState({
  //     navs: items
  //   });
  // }
  /**
   *@returns {*} view for langing page
   */
  render() {
    const { navClassName, sideNavStyle } = this.state;
    return (
      <header style={{ zIndex: '1' }}>
        <div className={navClassName} id="navigator">
          <NavLink to="/" target="">Evento</NavLink>
          <div className="nav-menu" style={{ float: 'right' }}>
            <NavLink to="/login" target="">Login</NavLink>
            <NavLink to="/register" target="">Register</NavLink>
          </div>
          <a className="icon" onClick={this.navCLick}>&#9776;</a>
        </div>
        <div id="mySidenav" className="sidenav" style={sideNavStyle}>
          <a className="closebtn" onClick={this.closeSideNav}>&times;</a>
          <NavLink to="/login" target="">Login</NavLink>
          <NavLink to="/register" target="">Register</NavLink>
        </div>
        {/* <Navbar fixed className="title white-text" brand="Evento" right>
          {navs}
          {user && <li><a role="link" tabIndex="-1" onClick={this.logOut} target="">logout</a></li>}
        </Navbar> */}
        {/* <div className="navbar-fixed">
          <nav className=" z-depth-0 navigation">
            <div className="nav-wrapper">
              <div className="row">
                <div className="col s12">
                  <Link
                    to="#side-nav"
                    data-activates="mobile-demo"
                    className="button-collapse hide-on-med-and-up"
                  >
                    <i className="material-icons">menu</i>
                  </Link>
                  <Link to="/" className="brand-logo title" target="">EventsManager</Link>
                  <ul className="right hide-on-med-and-down">
                    {navs}
                    {user && <li><a onClick={this.logOut} target="">logout</a></li>}
                  </ul>
                </div>
              </div>
              <ul className="side-nav" id="mobile-demo">
                {navs}
                {user && <li><a onClick={this.logOut} target="">logout</a></li>}
              </ul>
            </div>
          </nav>
        </div> */}
      </header>
    );
  }
}


export default Header;
