import React, { Component } from 'react';
import Landing from './app/components/Landing/Landing';
import './App.css';

/**
 *
 */
class App extends Component {
  /**
   *@returns {*} view for langding page
   */
  render() {
    return (
      <div>
        <Landing />
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      
    );
  }
}

export default App;
