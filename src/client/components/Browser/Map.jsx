/* global google */
import { default as React, Component } from 'react';
import raf from 'raf';
import canUseDOM from 'can-use-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { withGoogleMap, GoogleMap, Circle, InfoWindow, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import geolib from 'geolib';
import { geolocated } from 'react-geolocated';
import ItemList from './ItemList';

import Paper from 'material-ui/Paper';
import Img from 'react-image';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CreateRadius from './CreateRadius';

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?libraries=places,geometry&key=AIzaSyA7XEFRxE4Lm28tAh44M_568fCLOP_On3k';

const isJson = (str) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
};

const GeolocationGoogleMap = withScriptjs(
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
      {props.markers.map((marker, index) => {
        const onClick = () => props.onMarkerClick(marker);
        const onCloseClick = () => props.onCloseClick(marker);

        return (
          <Marker
            key={index}
            position={marker.position}
            title={(marker.number).toString()}
            onClick={onClick}
            options={{ icon: 'https://image.ibb.co/evMHxF/shopping_zone_marker_1.png' }}
          >
            {marker.showInfo &&
              <InfoWindow onCloseClick={onCloseClick} >
                <div>
                  <ItemList marker={marker} />
                </div>
              </InfoWindow>}
          </Marker>
        );
      })}
    </GoogleMap>,
  ),
);

class OfferMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: null,
      center: null,
      content: null,
      radius: 2500, // ACZ --> put this const in config_env.
      markers: [],
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.filterItemsByRadius = this.filterItemsByRadius.bind(this);
    this.radiusChange = this.radiusChange.bind(this);
  }

  componentWillReceiveProps(props){

    if (props.coords && !props.coords.positionError)
      {this.setState({ center: { lat: props.coords.latitude, lng: props.coords.longitude } });}
    else {
      fetch('http://ip-api.com/json')
        .then(res => res.json())
        .then((data) => {
          this.setState({ center: { lat: data.lat, lng: data.lon } });
        })
        .catch((error) => {
          this.setState({ content: `Error: The Geolocation service failed (${error.message}).` });
        });
    }
    this.setState({ markers: props.items });
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker._id === targetMarker._id) {
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
        if (marker._id === targetMarker._id) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  filterItemsByRadius(userRadius) {
    const items = this.state.markers;
    const markers = [];
    items.map((item, i) => {
      let itemGeolocation;
      let itemDescription = 'NO DESCRIPTION';
      let itemMedia;
      if (isJson(item.description)) {
        itemDescription = JSON.parse(item.description).description;
        itemMedia = JSON.parse(item.description).media;
      }
      if (isJson(item.geolocation)) {
        itemGeolocation = JSON.parse(item.geolocation).coords;
      }
      if (this.state.center) {
        const currentLocation = {
          latitude: this.state.center.lat,
          longitude: this.state.center.lng,
        };
        const distanceArr = geolib.orderByDistance(currentLocation, [itemGeolocation]);
        const miles = (distanceArr[0].distance / 1609.34).toFixed(2);
        if (miles <= userRadius) {
          markers.push({
            _id: item._id,
            position: itemGeolocation,
            number: i,
            content: itemDescription,
            price: item.price,
            quantity: item.quantity,
            currency: item.currency,
            category: item.category,
            title: item.title,
            offer: item.offer,
            media: itemMedia,
            showInfo: item.showInfo || false,
          });
        }
      }
    });
    return markers;
  }

  radiusChange(radius) {
    this.setState({ radius });
  }

  render() {
    const markers = this.filterItemsByRadius(this.state.radius);
    return (
      <div>
        <div>
          <CreateRadius
            radiusChange={this.radiusChange}
            numOffers={markers.length}
            initRadius={this.state.radius}
          />
        </div>
        <br />

        <div
          style={{
            width: '100%',
            height: '500px',
          }}
        >
          <GeolocationGoogleMap
            googleMapURL={googleMapURL}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            center={this.state.center}
            content={this.state.content}
            radius={this.state.radius}
            onMarkerClick={this.handleMarkerClick}
            onCloseClick={this.handleCloseClick}
            markers={markers}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ browser }) {
  return { browser };
}

export default connect(mapStateToProps)(geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(OfferMap));
