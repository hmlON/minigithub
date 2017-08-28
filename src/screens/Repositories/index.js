import React, { Component } from 'react';
import RepositoriesList from './RepositoriesList';
import Loading from './Loading';
import Failed from './Failed';

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      sort_parameter: "updated_at",
      sort_ascending: false
    }
  }

  github_api_url() {
    return 'https://api.github.com/users/' + this.props.username + '/repos'
  }

  componentDidMount() {
    fetch(this.github_api_url())
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          repos: data
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  sort(repos) {
    repos = repos.sort((a, b) => (a[this.state.sort_parameter] > b[this.state.sort_parameter]) ? 1 : -1)
    if (this.state.sort_ascending) {
      return repos
    }
    return repos.reverse()
  }

  render() {
    if (this.state.requestFailed) return <Failed />
    if (!this.state.repos) return <Loading />

    var repos = this.sort(this.state.repos)

    console.log(repos[0]);

    return (
      <RepositoriesList repos={repos}/>
    );
  }
}

export default Repositories;
