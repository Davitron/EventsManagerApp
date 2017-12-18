import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';
import '../../../App.css';

/**
 *
 */
class Header extends Component {
  /**
   *@returns {*} view for langing page
   */
  render() {
    return (
      <header>
        <Navbar brand='EventsManager' fixed={true} className="App-header" right>
          <NavItem href='get-started.html'>SignIn</NavItem>
          <NavItem href='components.html'>SignUp</NavItem>
        </Navbar>
      </header>
    );
  }
}

export default Header;
