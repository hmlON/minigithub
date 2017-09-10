import React, { Component } from 'react';

class TypeFilter extends Component {
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

    this.props.updateIsFork(value)
  }

  render() {
    return (
      <div className="TypeFilter">
        <label>
          Type:
          <select value={this.props.value} onChange={this.handleChange}>
            <option value="null">All</option>
            <option value="true">Forks</option>
            <option value="false">Sources</option>
          </select>
        </label>
      </div>
    );
  }
}

export default TypeFilter;
