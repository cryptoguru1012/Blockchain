import React, { Component } from 'react';
import Slider from 'material-ui/Slider';


class CreateRadius extends Component {
  constructor() {
    super();
    this.state = {
      markerRadius: 15000
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

    this.props.radiusChange(radius)
  }

  submitRadius() {
    this.props.radiusChange(this.state.markerRadius);
  }

  componentDidMount() {
     this.submitRadius()
  }


  render() {
    return (

      <div style={{fontFamily:'Roboto', fontStyle:'normal'}}>
        Showing {this.props.numOffers} offers within &nbsp;
        <input
          type="number"
          onChange={this.updateRadius.bind(this)}
          id="radius"
          placeholder="miles"
          value={this.state.markerRadius}
          style = {{width:'10%'}}
        />
        &nbsp; miles 
        <br />
      </div>
    );
  }
}

export default CreateRadius;
