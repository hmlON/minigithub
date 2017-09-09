import React, { Component } from 'react';

class PullsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState({pulls: data})
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    if (!this.props.url) return null
    if (this.state.requestFailed) return <div>Failed!</div>
    if (!this.state.pulls) return <div>Loading...</div>

    const pulls = this.state.pulls.slice(0, 5)

    return (
      <div className="PullsList">
        <h3>5 most commented Pulls</h3>
        <ul>
          { pulls.map(pull => <li><a href={pull.html_url}>{pull.title}</a></li> )}
        </ul>
      </div>
    );
  }
}

export default PullsList;
