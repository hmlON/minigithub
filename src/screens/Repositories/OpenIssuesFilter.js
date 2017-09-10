import React, { Component } from 'react';

class OpenIssuesFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value;
    switch (event.target.value) {
      case "true": value = true; break;
      case "false": value = false; break;
      default: value = null
    }

    this.props.updateHasOpenIssues(value)
  }

  render() {
    return (
      <div className="OpenIssuesFilter">
        <label>
          Has open issues:
          <select value={this.props.value} onChange={this.handleChange}>
            <option value="null">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </label>
      </div>
    );
  }
}

export default OpenIssuesFilter;
