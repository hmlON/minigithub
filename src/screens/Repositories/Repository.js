import React, { Component } from 'react';

class Repository extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.openDialog(this.props.url)
  }

  render() {
    let is_fork = null;
    if (this.props.fork) {
      is_fork =  <div className="Repository-is-fork">This is a fork</div>;
    }

    return (
      <div className="Repository" onClick={this.handleClick}>
        <div className="Repository-name">
          {this.props.name}
        </div>
        {is_fork}
        <div className="Repository-description">
          {this.props.description}
        </div>
        <div className="Repository-stars-count">
          Stars: {this.props.stargazers_count}
        </div>
        <div className="Repository-updated-at">
          Updated on: {new Date(this.props.updated_at).toLocaleString()}
        </div>
        <div className="Repository-language">
          Language: {this.props.language}
        </div>
      </div>
    );
  }
}

export default Repository;
