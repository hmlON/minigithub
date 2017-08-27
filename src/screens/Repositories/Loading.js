import React, { Component } from 'react';
import './NoData.css';

class Loading extends Component {
  render() {
    return (
      <div className="NoData">
        <div className="Loading">
          Loading...
        </div>
      </div>
    );
  }
}

export default Loading;
