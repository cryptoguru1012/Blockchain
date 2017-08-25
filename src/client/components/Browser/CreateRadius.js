import React, { Component } from 'react';
import Slider from 'material-ui/Slider';


class CreateRadius extends Component {
  constructor() {
    super();
    this.state = {
      markerRadius: 0,
    };
  }
  
  componentWillMount() {
    this.setState({ markerRadius: this.props.initRadius });
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

    this.props.radiusChange(radius);
  }

  render() {
    return (

      <div style={{fontFamily: 'Roboto', fontStyle: 'normal'}}>
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
