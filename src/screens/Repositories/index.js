import React, { Component } from 'react';
// import RepositoriesList from './RepositoriesList';
import Loading from './Loading';
import Failed from './Failed';

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
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

  render() {
    if (this.state.requestFailed) return <Failed />
    if (!this.state.repos) return <Loading />

    console.log(this.state.repos);

    return (
      <Loading />
    );
  }
}

export default Repositories;
