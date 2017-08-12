import React, { Component } from 'react';

class CreateRadius extends Component {
  constructor() {
    super();
    this.state = {
      markerRadius: 0,
    };
  }

  updateRadius(event) {
    event.preventDefault();
    const radius = Number(event.target.value);
    if (typeof radius !== 'number' || isNaN(radius)) {
      alert('must put in a number for radius');

      return;
    }
    this.setState({
      markerRadius: radius,
    });
  }

  submitRadius() {
    this.props.radiusChange(this.state.markerRadius);
  }

  render() {
    return (
      <div style={{ backgroundColor: 'rgba(255,255,255, 0.1)' }}>
        <h4>Change Radius</h4>
        <input
          type="number"
          onChange={this.updateRadius.bind(this)}
          id="radius"
          placeholder="radius"
        />
        <button onClick={this.submitRadius.bind(this)}>Change Radius</button>
        <br />
      </div>
    );
  }
}

export default CreateRadius;
