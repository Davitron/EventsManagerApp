import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'react-router-dom';


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
      user: undefined,
      navs: []
    };
  }

  /**
   *@returns{*} authentication status
   */
  componentWillMount() {

  }

  /**
   * @param {*} nextProps
   * @returns {*} check props change
   */
  componentWillReceiveProps(nextProps) {

  }


  /**
   *@returns {*}
   *this will produce appropriate navabar menu for role
   */
  renderByRole() {
    const { user } = this.state;
    let userName;
    if (user) {
      userName = '';
    } else {
      userName = user.username;
    }
    let items;
    const linkByRoles = {
      unAuthUser: [
        {
          linkName: 'SignIn',
          linkRef: '/SignIn'
        },
        {
          linkName: 'SignUp',
          linkRef: '/SignUp'
        }
      ],
      user: [
        {
          linkName: userName,
          linkRef: ''
        },
        {
          linkName: 'My Events',
          linkRef: '/events'
        },
        {
          linkName: 'Logout',
          linkRef: '/SignOut'
        }
      ],
      admin: [
        {
          linkName: 'Admin',
          linkRef: ''
        },
        {
          linkName: 'Centers',
          linkRef: '/Centers'
        },
        {
          linkName: 'My Events',
          linkRef: '/events'
        },
        {
          linkName: 'Pending Events',
          linkRef: '/pendingEvents'
        },
        {
          linkName: 'SignOut',
          linkRef: '/SignOut'
        }
      ]
    };
    if (user && user.isVerified === false && user.isAdmin === false) {
      items = linkByRoles.user
        .map((item, index) => (
          <NavItem key={shortid.generate()} href={item.linkRef}>
            {item.linkName}
          </NavItem>));
    } else if (user && user.isVerified === true && user.isAdmin === true) {
      items = linkByRoles.admin
        .map((item, index) => (
          <NavItem key={shortid.generate()} href={item.linkRef}>
            {item.linkName}
          </NavItem>));
    } else {
      items = linkByRoles.unAuthUser
        .map((item, index) => (
          <NavItem key={shortid.generate()} href={item.linkRef}>
            {item.linkName}
          </NavItem>));
    }
    this.setState({
      navs: items
    });
  }

  /**
   *@returns {*} view for langing page
   */
  render() {
    const { navs } = this.state;
    return (
      <header>
        <div className="navbar-fixed">
          <nav className=" z-depth-0 navigation">
            <div className="nav-wrapper">
              <div className="row">
                <div className="col s12">
                  <Link to="#side-nav" data-activates="mobile-demo" className="button-collapse hide-on-med-and-up"><i className="material-icons">menu</i></Link>
                  <Link to="/" className="brand-logo title" target="">EventsManager</Link>
                  <ul className="right hide-on-med-and-down">
                    <li><Link to="/login" target="">Login</Link></li>
                    <li><Link to="/register" target="">Register</Link></li>
                  </ul>
                </div>
              </div>
              <ul className="side-nav" id="mobile-demo">
                <li><Link to="/login" target="">Login</Link></li>
                <li><Link to="/register" target="">Register</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

// const mapStateToProps = state => ({ userStateProps: state.userSignIn });

Header.propTypes = {
  userStateProps: PropTypes.objectOf(() => null)
};

Header.defaultProps = {
  userStateProps: {}
};


export default Header;
