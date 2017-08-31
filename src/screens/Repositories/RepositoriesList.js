import React, { Component } from 'react';
import Repository from './Repository';

class RepositoriesList extends Component {
  render() {
    const repos = this.props.repos.map((repo) =>
      <Repository key={repo.id} {...repo} openDialog={this.props.openDialog}/>
    );

    return (
      <div className="RepositoriesList">
        {repos}
      </div>
    );
  }
}

export default RepositoriesList;
