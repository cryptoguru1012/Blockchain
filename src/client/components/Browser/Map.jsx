import { default as React, Component } from 'react';
import raf from 'raf';
import canUseDOM from 'can-use-dom';

import { withGoogleMap, GoogleMap, Circle, InfoWindow, FaSpinner } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyA7XEFRxE4Lm28tAh44M_568fCLOP_On3k';
const geolocation =
  canUseDOM && navigator.geolocation
    ? navigator.geolocation
    : {
      getCurrentPosition(success, failure) {
        failure("Your browser doesn't support geolocation.");
      },
    };
const GeolocationExampleGoogleMap = withScriptjs(
  withGoogleMap(props =>
    <GoogleMap defaultZoom={12} center={props.center}>
      {props.center &&
        <InfoWindow position={props.center}>
          <div>
            {props.content}
          </div>
        </InfoWindow>}
      {props.center &&
        <Circle
          center={props.center}
          radius={props.radius}
          options={{
            fillColor: 'red',
            fillOpacity: 0.2,
            strokeColor: 'red',
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />}
      >
    </GoogleMap>,
  ),
);

export default class GeolocationExample extends Component {
  constructor(props) {
    super(props);
    super(props);
    this.state = {
      center: null,
      content: null,
      radius: 6000,
    };

    const isUnmounted = false;
  }

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };

    geolocation.getCurrentPosition(
      (position) => {
        if (this.isUnmounted) {
          return;
        }
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          content: 'Location found using HTML5.',
        });

        raf(tick);
      },
      (reason) => {
        if (this.isUnmounted) {
          return;
        }

        this.setState({
          center: {
            lat: 60,
            lng: 105,
          },
          content: `Error: The Geolocation service failed (${reason}).`,
        });
      },
    );
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
      <GeolocationExampleGoogleMap
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '100%' }}>loading...</div>}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
      />
    );
  }
}
