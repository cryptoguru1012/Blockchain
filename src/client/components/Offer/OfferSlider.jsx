import React, {Component} from "react";
import {Col} from "react-bootstrap";
import RaisedButton from 'material-ui/RaisedButton';

const image_url = "http://cdn6.bigcommerce.com/s-iit0ug/products/3655/images/8659/XBR-55-65X850D_B_hero-4KHDR__65802.1502395922.1280.1280.jpg?c=2";

class OfferSlider extends Component {
  render() {
    return (
      <div className="slider-content">
        <Col xs={5} xsOffset={1} className="slider-image">
          <img src={image_url} className="img img-responsive"/>
        </Col>
        <Col xs={6} className="slider-info">
          <h2 className="slider-title">Item Name</h2>
          <h3 className="slider-title__small">From: 99 SYS</h3>
          <p className="slider-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          </p>
          <RaisedButton label="Add to Cart" className="btn-green"/>
        </Col>
      </div>
    )
  }
}

export default OfferSlider;
