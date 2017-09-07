import React, { Component } from 'react';
import RepositoriesList from './RepositoriesList';
import SortersList from './SortersList';
import OrderForm from './OrderForm';
import Dialog from './Dialog';
import Loading from './Loading';
import Failed from './Failed';
import './index.css';

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      requestFailed: false,
      pagesLoaded: 0,
      sortParameter: "updated_at",
      ascendingOrder: false,
      dialogRepoUrl: null
    }

    this.loadRepos = this.loadRepos.bind(this);
    this.updateSortParameter = this.updateSortParameter.bind(this);
    this.updateAscendingOrder = this.updateAscendingOrder.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentDidMount() {
    this.loadRepos()
  }

  githubApiUrl() {
    // Sort parameter was added for the better user expirience
    // (so that user will get the freshest repos first and will load older with "load more" buttom)
    return `https://api.github.com/users/${this.props.username}/repos?sort=updated&page=${this.state.pagesLoaded + 1}`
  }

  loadRepos() {
    fetch(this.githubApiUrl())
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState(prevState => {
          return {
            repos: prevState.repos.concat(data),
            pagesLoaded: prevState.pagesLoaded + 1
          }
        })
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  updateSortParameter(sortParameter) {
    this.setState({sortParameter: sortParameter})
  }

  updateAscendingOrder(ascendingOrder) {
    this.setState({ascendingOrder: ascendingOrder})
  }

  openDialog(repoUrl) {
    this.setState({dialogRepoUrl: repoUrl})
  }

  closeDialog() {
    this.setState({dialogRepoUrl: null})
  }

  sort(repos) {
    repos = repos.sort((a, b) => (a[this.state.sortParameter] > b[this.state.sortParameter]) ? 1 : -1)
    if (this.state.ascendingOrder) {
      return repos
    }
    return repos.reverse()
  }

  render() {
    if (this.state.requestFailed) return <Failed />
    if (!this.state.repos) return <Loading />

    var repos = this.sort(this.state.repos)

    return (
      <div className="Repositories">
        <div className="Repositories-header">
          <h3>Repositories of {this.props.username}</h3>
        </div>
        <div className="formatters">
          <SortersList sortParameter={this.state.sortParameter} updateSortParameter={this.updateSortParameter} />
          <OrderForm ascendingOrder={this.state.ascendingOrder} updateAscendingOrder={this.updateAscendingOrder} />
        </div>
        <RepositoriesList repos={repos} openDialog={this.openDialog}/>
        <Dialog url={this.state.dialogRepoUrl} closeDialog={this.closeDialog} />
        <button onClick={this.loadRepos}>Load more</button>
      </div>
    );
  }
}

export default Repositories;
