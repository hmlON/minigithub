import React, { Component } from 'react';
import RepositoriesList from './RepositoriesList';
import SortersList from './SortersList';
import OrderForm from './OrderForm';
import Loading from './Loading';
import Failed from './Failed';

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      sortParameter: "updated_at",
      ascendingOrder: false
    }

    this.updateSortParameter = this.updateSortParameter.bind(this);
    this.updateAscendingOrder = this.updateAscendingOrder.bind(this);
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

  updateSortParameter(sortParameter) {
    this.setState({sortParameter: sortParameter})
  }

  updateAscendingOrder(ascendingOrder) {
    this.setState({ascendingOrder: ascendingOrder})
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

    console.log(repos[0]);

    return (
      <div className="Repositories">
        <SortersList sortParameter={this.state.sortParameter} updateSortParameter={this.updateSortParameter} />
        <OrderForm ascendingOrder={this.state.ascendingOrder} updateAscendingOrder={this.updateAscendingOrder} />
        <RepositoriesList repos={repos}/>
      </div>
    );
  }
}

export default Repositories;
