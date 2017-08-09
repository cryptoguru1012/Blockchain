/* global google */
import { default as React, Component } from 'react';
import raf from 'raf';
import canUseDOM from 'can-use-dom';
import { connect } from 'react-redux';
import { withGoogleMap, GoogleMap, Circle, InfoWindow, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import geolib from 'geolib';

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
    <GoogleMap defaultZoom={6} center={props.center}>
      {props.center &&
        <InfoWindow position={props.center}>
          <div>User's Location</div>
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
      {props.markers.map((marker, index) => {
        const onClick = () => props.onMarkerClick(marker);
        const onCloseClick = () => props.onCloseClick(marker);

        return (
          <Marker
            key={index}
            position={marker.position}
            title={(index + 1).toString()}
            onClick={onClick}
          >
            {marker.showInfo &&
              <InfoWindow onCloseClick={onCloseClick}>
                <div>
                  <strong>
                    <h2>
                      {marker.content}
                    </h2>
                  </strong>
                  <br />
                  <h3>Where we can add offer details!</h3>
                </div>
              </InfoWindow>}
          </Marker>
        );
      })}
    </GoogleMap>,
  ),
);

function generateInitialMarkers(items) {
  console.log('item', items);
  const markers = [];
  items.map((item, i) => {
    const newGeoArr = item.geolocation.split(',');
    if (
      newGeoArr.length > 1 &&
      newGeoArr !== '' &&
      newGeoArr[0] !== undefined &&
      newGeoArr[0] !== null
    ) {
      item.position = { lat: Number(newGeoArr[0]), lng: Number(newGeoArr[1]) };
      item.distance = { latitude: Number(newGeoArr[0]), longitude: Number(newGeoArr[1]) };
      geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const distanceArr = geolib.orderByDistance(currentLocation, [item.distance]);
        const miles = (distanceArr[0].distance / 1609.34).toFixed(2);

        if (miles < 200) {
          markers.push({
            position: item.position,
            content: item.description,
            showInfo: false,
          });
        }
      });
    }
  });

  console.log('markers: ', markers);
  return markers;
}

class OfferMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      content: null,
      radius: 100000,
      markers: generateInitialMarkers(this.props.items) || [],
    };

    const isUnmounted = false;

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        radius: Math.max(this.state.radius - 200, 0),
      });

      if (this.state.radius > 100) {
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
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
      />
    );
  }
}

function mapStateToProps({ browser }) {
  return { browser };
}

export default connect(mapStateToProps)(OfferMap);
