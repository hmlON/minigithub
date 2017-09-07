import React, { Component } from 'react';

class ContributorsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidUpdate() {
    fetch(this.props.url)
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed')
        }
        return response
      })
      .then(data => data.json())
      .then(data => {
        this.setState({contributors: data})
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    if (!this.props.url) return null
    if (this.state.requestFailed) return <div>Failed!</div>
    if (!this.state.contributors) return <div>Loading...</div>

    const contributors = this.state.contributors.sort((a, b) => (a.contributions < b.contributions) ? 1 : -1).slice(0, 3)

    return (
      <div className="ContributorsTable">
        <h3>Top 3 Contributors</h3>
        <table>
          <tr>
            <th>username</th>
            <th>contributions</th>
          </tr>
          {contributors.map(contributor =>
            <tr><td>{contributor.login}</td><td>{contributor.contributions}</td></tr>
          )}
        </table>
      </div>
    );
  }
}

export default ContributorsTable;
