import React, { Component } from 'react';

class DateFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updateUpdatedAfter(event.target.value)
  }

  render() {
    return (
      <div className="DateFilter">
        <label>Updated after</label>
        <input type="date" onChange={this.handleChange}/>
      </div>
    );
  }
}

export default DateFilter;
