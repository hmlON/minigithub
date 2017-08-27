import React, { Component } from 'react';
import './App.css';
import Repositories from './screens/Repositories/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Welcome to MiniGithub</h3>
        </div>
        <Repositories username="hmlon" />
      </div>
    );
  }
}

export default App;
