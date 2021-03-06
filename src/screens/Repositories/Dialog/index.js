import React, { Component } from 'react';
import ContributorsTable from './ContributorsTable';
import LanguagesTable from './LanguagesTable';
import PullsList from './PullsList';
import Loading from '../Loading';
import Failed from '../Failed';

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidUpdate() {
    if (!this.props.url) return null

    fetch(this.props.url)
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState(data)
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    if (!this.props.url) return null
    if (this.state.requestFailed) return <Failed />
    if (!this.state.id) return <Loading />

    var fork_link = ""
    if (this.state.fork) {
      fork_link = (
        <div className="Dialog-content-element">
          Forked from <a href={"https://github.com/" + this.state.parent.full_name}>{this.state.parent.full_name}</a>
        </div>
      )
    }

    return (
      <div className="Dialog">
        <div className="Dialog-inner">
          <div className="Dialog-header">
            <div className="Dialog-header-text">
              {this.state.name}
            </div>
            <div className="Dialog-close" onClick={this.props.closeDialog}>
              X
            </div>
          </div>
          <div className="Dialog-content">
            <div className="Dialog-content-element">
              <a href={"https://github.com/" + this.state.full_name}>Open on Github</a>
            </div>
            { fork_link }
            <ContributorsTable url={this.state.contributors_url} />
            <LanguagesTable url={this.state.languages_url} />
            <PullsList url={this.state.pulls_url.split("{")[0] + "?state=open&sort=popularity&direction=desc"} />
          </div>
        </div>
      </div>
    );
  }
}

export default Repositories;
