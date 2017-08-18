import React from 'react';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

/**
 * class GaleryItemBrowser
 *
 * Display offer image in grid
 */
class GaleryItemBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.renderSlide = this.renderSlide.bind(this);
  }

  renderSlide() {
    return this.props.images.map((image, i) => (
      <img style={{ width: '100%' }} key={i} src={image} />
      ));
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          {this.renderSlide()}
        </Col>
      </Row>
    );
  }
}

export default GaleryItemBrowser;
