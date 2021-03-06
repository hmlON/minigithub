import React, { Component } from 'react';
import Sorter from './Sorter';

class SortersList extends Component {
  constructor(props) {
    super(props)

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.props.updateSortParameter(event.target.value)
  }

  render() {
    return (
      <div className="SortersList">
        <div className="Sorters-description">
          Sort by:
        </div>
        <form>
          <Sorter name="Repo name" sortParameter="name" selectedSortParameter={this.props.sortParameter} handleOptionChange={this.handleOptionChange}  />
          <Sorter name="Stars count" sortParameter="stargazers_count" selectedSortParameter={this.props.sortParameter} handleOptionChange={this.handleOptionChange}  />
          <Sorter name="Open issues count" sortParameter="open_issues_count" selectedSortParameter={this.props.sortParameter} handleOptionChange={this.handleOptionChange}  />
          <Sorter name="Updated date" sortParameter="pushed_at" selectedSortParameter={this.props.sortParameter} handleOptionChange={this.handleOptionChange}  />
        </form>
      </div>
    );
  }
}

export default SortersList;
