import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Link } from 'react-router-dom';
import AuthChecker from '../helpers/auth-checker';


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
    const authUser = AuthChecker.getUserDetails();
    this.setState({
      user: authUser
    }, () => {
      this.renderByRole();
    });
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
    if (user === null) {
      userName = '';
    } else {
      userName = user.username;
    }
    let items;
    const navByRoles = {
      unAuthUser: [
        {
          linkName: 'login',
          linkRef: '/login'
        },
        {
          linkName: 'register',
          linkRef: '/register'
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
          linkName: 'logout',
          linkRef: '/logout'
        }
      ],
      admin: [
        {
          linkName: 'Admin',
          linkRef: ''
        },
        {
          linkName: 'Centers',
          linkRef: '/centers'
        },
        {
          linkName: 'My Events',
          linkRef: '/events'
        },
        {
          linkName: 'logout',
          linkRef: '/logout'
        }
      ]
    };
    if (user && user.isVerified === false && user.isAdmin === false) {
      items = navByRoles.user
        .map((item, index) => (
          <li key={shortid.generate()}>
            <Link to={item.linkRef} target="">{item.linkName}</Link>
          </li>
        ));
    } else if (user && user.isVerified === true && user.isAdmin === true) {
      items = navByRoles.admin
        .map((item, index) => (
          <li key={shortid.generate()}>
            <Link to={item.linkRef} target="">{item.linkName}</Link>
          </li>
        ));
    } else {
      items = navByRoles.unAuthUser
        .map((item, index) => (
          <li key={shortid.generate()}>
            <Link to={item.linkRef} target="">{item.linkName}</Link>
          </li>
        ));
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
                    {navs}
                  </ul>
                </div>
              </div>
              <ul className="side-nav" id="mobile-demo">
                {navs}
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
