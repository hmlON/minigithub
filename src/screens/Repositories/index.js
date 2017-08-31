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
      requestFailed: false,
      sortParameter: "updated_at",
      ascendingOrder: false,
      showDialog: false,
      dialogRepoName: null
    }

    this.updateSortParameter = this.updateSortParameter.bind(this);
    this.updateAscendingOrder = this.updateAscendingOrder.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  githubApiUrl() {
    return 'https://api.github.com/users/' + this.props.username + '/repos'
  }

  componentDidMount() {
    fetch(this.githubApiUrl())
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

  updateSortParameter(sortParameter) {
    this.setState({sortParameter: sortParameter})
  }

  updateAscendingOrder(ascendingOrder) {
    this.setState({ascendingOrder: ascendingOrder})
  }

  openDialog(repoName) {
    this.setState({
      showDialog: true,
      dialogRepoName: repoName
    })
  }

  closeDialog() {
    this.setState({showDialog: false})
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
        <Dialog username={this.props.username} name={this.state.dialogRepoName} shown={this.state.showDialog} closeDialog={this.closeDialog} />
      </div>
    );
  }
}

export default Repositories;
