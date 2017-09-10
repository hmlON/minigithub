import React, { Component } from 'react';

class StarsFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.value)
    // this.props.updateAscendingOrder(event.target.value === "ascending")
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

// <input type="radio" value='ascending' checked={this.props.ascendingOrder === true} onChange={this.handleOptionChange}/>

export default StarsFilter;
