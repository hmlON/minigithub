import React, { Component } from 'react';
import './NoData.css';

class Failed extends Component {
  render() {
    return (
      <div className="NoData">
        <div className="Failed">
          Failed!
        </div>
      </div>
    );
  }
}

export default Failed;
