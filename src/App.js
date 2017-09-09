import React, { Component } from 'react';
import './App.css';
import Repositories from './screens/Repositories/';
import Owner from './screens/Owner/';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "hmlon"
    }

    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(username) {
    this.setState({username: username})
  }

  render() {
    if (this.state.username) return <Repositories username={this.state.username} />

    return <Owner username="hmlon" handleSubmit={this.updateUsername}/>;
  }
}

export default App;
