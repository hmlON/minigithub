import React, { Component } from 'react';
import RepositoriesList from './RepositoriesList';
import SortersList from './SortersList';
import OrderForm from './OrderForm';
import StarsFilter from './StarsFilter';
import DateFilter from './DateFilter';
import TypeFilter from './TypeFilter';
import Dialog from './Dialog/';
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
      dialogRepoUrl: null,

      // sorting
      sortParameter: "pushed_at",
      ascendingOrder: false,

      // filters
      hasOpenIssues: null,
      hasTopics: null,
      minStarsCount: null,
      updatedAfter: null,
      isFork: null,
      language: null
    }

    this.loadRepos = this.loadRepos.bind(this);
    this.updateSortParameter = this.updateSortParameter.bind(this);
    this.updateAscendingOrder = this.updateAscendingOrder.bind(this);
    this.updateMinStarsCount = this.updateMinStarsCount.bind(this);
    this.updateUpdatedAfter = this.updateUpdatedAfter.bind(this);
    this.updateIsFork = this.updateIsFork.bind(this);
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

  updateMinStarsCount(minStarsCount) {
    this.setState({minStarsCount: minStarsCount})
  }

  updateUpdatedAfter(updatedAfter) {
    this.setState({updatedAfter: updatedAfter})
  }

  updateIsFork(isFork) {
    this.setState({isFork: isFork})
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

  filter(repos) {
    switch (this.state.hasOpenIssues) {
      case true: repos = repos.filter(repo => repo.open_issues_count > 0); break;
      case false: repos = repos.filter(repo => repo.open_issues_count === 0); break;
      default: break;
    }
    switch (this.state.isFork) {
      case true: repos = repos.filter(repo => repo.fork); break;
      case false: repos = repos.filter(repo => !(repo.fork)); break;
      default: break;
    }
    if (this.state.minStarsCount) { repos = repos.filter(repo => repo.stargazers_count >= this.state.minStarsCount) }
    if (this.state.updatedAfter) { repos = repos.filter(repo => new Date(repo.pushed_at) >= new Date(this.state.updatedAfter)) }
    if (this.state.language) { repos = repos.filter(repo => repo.language === this.state.language) }
    return repos
  }

  render() {
    if (this.state.requestFailed) return <Failed />
    if (!this.state.repos) return <Loading />

    var repos = this.sort(this.filter(this.state.repos))

    return (
      <div className="Repositories">
        <div className="Repositories-header">
          <h3>Repositories of {this.props.username}</h3>
        </div>
        <div className="Repositories-formatters">
          <div className="filters">
            <StarsFilter updateMinStarsCount={this.updateMinStarsCount} />
            <DateFilter updateUpdatedAfter={this.updateUpdatedAfter} />
            <TypeFilter updateIsFork={this.updateIsFork} />
          </div>
          <div className="sorters">
            <SortersList sortParameter={this.state.sortParameter} updateSortParameter={this.updateSortParameter} />
            <OrderForm ascendingOrder={this.state.ascendingOrder} updateAscendingOrder={this.updateAscendingOrder} />
          </div>
        </div>
        <RepositoriesList repos={repos} openDialog={this.openDialog}/>
        <Dialog url={this.state.dialogRepoUrl} closeDialog={this.closeDialog} />
        <button onClick={this.loadRepos}>Load more</button>
      </div>
    );
  }
}

export default Repositories;
