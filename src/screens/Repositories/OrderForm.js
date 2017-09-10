import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super(props)

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.props.updateAscendingOrder(event.target.value === "ascending")
  }

  render() {
    return (
      <div className="OrderForm">
        <div className="OrderForm-description">
          Order:
        </div>
        <form>
          <label>
            <input type="radio" value='ascending' checked={this.props.ascendingOrder === true} onChange={this.handleOptionChange}/>
            Ascending
          </label>
          <label>
            <input type="radio" value='descending' checked={this.props.ascendingOrder === false} onChange={this.handleOptionChange}/>
            Descending
          </label>
        </form>
      </div>
    );
  }
}

export default OrderForm;
