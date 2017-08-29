import React, { Component } from 'react';
import './index.css';

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value)
  }

  render() {
    return (
      <div className="Owner">
        <div className="Owner-header">
          <h1>Welcome to MiniGithub</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter username:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Owner;
