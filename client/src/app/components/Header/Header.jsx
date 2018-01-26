import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import AuthChecker from '../../../helpers/authChecker';
import '../../../App.css';

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
      user: undefined
    };
  }

  /**
   *@returns{*} authentication status
   */
  componentWillMount() {
    const authUser = AuthChecker.getUserDetails();
    this.setState({
      user: authUser
    });
  }
  /**
  *@param {*} nextState
  *@param {*} nextProps
  *@returns {boolean}
  *to ensure component is re-rendered when changes are made
  */
  shouldComponentUpdate(nextState, nextProps) {
    console.debug('shouldComponentUpdate', nextState, nextProps);
    return true;
  }

  /**
  *@returns {*}
  *to ensure component is re-rendered when changes are made
  */
  componentWillUpdate() {
    console.debug('componentWillUpdate');
  }

  /**
  *@returns {*}
  *to ensure component is re-rendered when changes are made
  */
  componentDidUpdate() {
    console.debug('componentDidUpdate');
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
      userName = user.user;
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
          linkRef: '/Pending Events'
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
    return items;
  }

  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <header>
        <Navbar brand="EventsManager" fixed className="App-header" right>
          {this.renderByRole()}
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => ({ userStateProps: state.userSignIn });

Header.propTypes = {
  userStateProps: PropTypes.objectOf(() => null)
};

Header.defaultProps = {
  userStateProps: {}
};


export default connect(mapStateToProps)(Header);
