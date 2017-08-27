import React, { Component } from 'react';

class Repository extends Component {
  render() {
    let is_fork = null;
    if (this.props.fork) {
      is_fork =  <div className="Repository-is-fork">This is a fork</div>;
    }

    return (
      <div className="Repository">
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
        <div className="Repository-stars-count">
          Updated on: {this.props.updated_at}
        </div>
        <div className="Repository-stars-count">
          Language: {this.props.language}
        </div>
        <hr/>
      </div>
    );
  }
}

export default Repository;
