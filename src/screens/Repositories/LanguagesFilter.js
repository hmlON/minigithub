import React, { Component } from 'react';

class LanguagesFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    if (value === "null") { value = null }

    this.props.updateLanguage(value)
  }

  render() {
    return (
      <div className="LanguagesFilter">
        <label>
          Language:
          <select value={this.props.value} onChange={this.handleChange}>
            <option value="null"> - </option>
            {this.props.languages.map(language => <option value={language} key={language}>{language}</option>)}
          </select>
        </label>
      </div>
    );
  }
}

export default LanguagesFilter;
