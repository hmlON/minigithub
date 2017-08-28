import React, { Component } from 'react';

class Sorter extends Component {
  render() {
    return (
      <div className="Sorter radio">
        <label>
          <input type="radio" value={this.props.sortParameter} checked={this.props.sortParameter === this.props.selectedSortParameter} onChange={this.props.handleOptionChange}/>
          {this.props.name}
        </label>
      </div>
    );
  }
}

export default Sorter;
