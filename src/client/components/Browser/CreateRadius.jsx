import React, { Component, PropTypes } from 'react';
import Slider from 'material-ui/Slider';


class CreateRadius extends Component {

  constructor() {
    super();
    this.state = {
      markerRadius: 0,
    };
    this.updateRadius = this.updateRadius.bind(this);
  }

  componentWillMount() {
    this.setState({ markerRadius: this.props.initRadius });
  }

  updateRadius(event) {
    event.preventDefault();
    const radius = Number(event.target.value);
    if (typeof radius !== 'number' || isNaN(radius)) {
      console.error('must put in a number for radius');

      return;
    }
    this.setState({
      markerRadius: radius,
    });

    this.props.radiusChange(radius);
  }

  render() {
    return (

      <div style={{ fontFamily: 'Roboto', fontStyle: 'normal' }}>
        {console.log('ACZ: ', this.props.numOffers)}
        Showing {this.props.numOffers} offers within &nbsp;
        <input
          type="number"
          onChange={this.updateRadius}
          id="radius"
          placeholder="miles"
          value={this.state.markerRadius}
          style={{ width: '10%' }}
        />
        &nbsp; miles
        <br />
      </div>
    );
  }
}

CreateRadius.propTypes = {
  initRadius: PropTypes.number.isRequired,
  radiusChange: PropTypes.func.isRequired,
  numOffers: PropTypes.number.isRequired,
};

export default CreateRadius;
