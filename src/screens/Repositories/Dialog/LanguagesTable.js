import React, { Component } from 'react';

class LanguagesTable extends Component {
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
        this.setState({languages: data})
      }, () => {
        this.setState({
          requestFailed: true
        })
      })
  }

  render() {
    if (!this.props.url) return null
    if (this.state.requestFailed) return <div>Failed!</div>
    if (!this.state.languages) return <div>Loading...</div>

    const languages = Object.keys(this.state.languages).map(key => {return {name: key, size: this.state.languages[key] / 1024}})
                                                       .filter((language) => language.size >= 1)

    return (
      <div className="LanguagesTable">
        <h3>Languages</h3>
        <table>
          <tr>
            <th>Language</th>
            <th>Size, Kb</th>
          </tr>
          {languages.map(language =>
            <tr><td>{language.name}</td><td>{language.size} Kb</td></tr>
          )}
        </table>
      </div>
    );
  }
}

export default LanguagesTable;
