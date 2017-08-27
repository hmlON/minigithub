import React, { Component } from 'react';
import './App.css';
import Repositories from './screens/Repositories/';
import Owner from './screens/Owner/';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null
    }

    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(username) {
    this.setState({username: username})
  }

  render() {
    if (this.state.username) return <Repositories username={this.state.username} />

    return (
      <div className="App">
        <div className="App-header">
          <h3>Welcome to MiniGithub</h3>
        </div>
        <Owner username="hmlon" handleSubmit={this.updateUsername}/>
      </div>
    );
  }
}

export default App;
