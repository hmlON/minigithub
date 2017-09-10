import React, { Component } from 'react';

class StarsFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updateMinStarsCount(event.target.value)
  }

  render() {
    return (
      <div className="StarsFilter">
        <label>Starred at least</label>
        <input type="number" onChange={this.handleChange}/>
      </div>
    );
  }
}

export default StarsFilter;
