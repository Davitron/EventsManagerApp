import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import '../../../App.css';

/**
 *
 */
class Header extends Component {
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
    const { userStateProps } = this.props;
    console.log(userStateProps);
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
          linkName: 'user',
          linkRef: ''
        },
        {
          linkName: 'SignOut',
          linkRef: '/SignOut'
        }
      ],
      admin: [
        {
          linkName: 'admin',
          linkRef: ''
        },
        {
          linkName: 'Centers',
          linkRef: '/Centers'
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
    if (userStateProps.user && !userStateProps.user.isVerified && !userStateProps.user.isAdmin) {
      items = linkByRoles.user
        .map((item, index) => <NavItem href={item.linkRef}>{item.linkName}</NavItem>);
    } else if (userStateProps.user && userStateProps.user.isVerified && userStateProps.isAdmin) {
      items = linkByRoles.admin
        .map((item, index) => <NavItem href={item.linkRef}>{item.linkName}</NavItem>);
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
    const { userStateProps } = this.props;
    return (
      <header>
        <Navbar brand="EventsManager" fixed className="App-header" right>
          {userStateProps.user && <NavItem href="#">{userStateProps.user.username}</NavItem>}
          {!userStateProps.user && <NavItem href="/SignIn">SignIn</NavItem>}
          {!userStateProps.user && <NavItem href="/SignUp">SignUp</NavItem>}
          {userStateProps.user && userStateProps.user.isAdmin === true && <NavItem href="/admin/centers">Centers</NavItem>}
          {userStateProps.user && userStateProps.user.isAdmin === true && <NavItem href="/admin/pending_events">Pending Events</NavItem>}
          {userStateProps.user && <NavItem href="/SignOut">SignOut</NavItem>}
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
