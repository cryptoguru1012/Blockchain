import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

const controlsStyle = {
  position: 'relative',
  marginTop: '5%',
};

/**
 * class ImageEdit
 *
 * Media action buttons
 *
 * Choose to upload or delete uploaded media
 */
/* eslint class-methods-use-this: 0 */  // --> OFF
/* eslint react/jsx-filename-extension: 0 */  // --> OFF
class ImageEdit extends Component {
  deleteIcon() {
    return <Glyphicon glyph="trash" />;
  }

  tickIcon() {
    return <Glyphicon glyph="ok" />;
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
          <img src={this.props.image_url} width="100%" alt="" />
          <Col md={6} style={controlsStyle}>
            {this.props.onDelete && <RaisedButton
              icon={this.deleteIcon()}
              backgroundColor="#eb4d5c"
              labelColor="#fff"
              onClick={this.props.onDelete}
              fullWidth
            />}
          </Col>
          <Col md={6} style={controlsStyle}>
            {this.props.onProceed && <RaisedButton
              icon={this.tickIcon()}
              backgroundColor="#3BB885"
              labelColor="#fff"
              onClick={this.props.onProceed}
              fullWidth
            />}
          </Col>
        </Col>
      </Row>
    );
  }
}

ImageEdit.propTypes = {
  onProceed: PropTypes.func,
  onDelete: PropTypes.func,
  image_url: PropTypes.string,
};
ImageEdit.defaultProps = {
  onProceed: () => {
  },
  onDelete: () => {
  },
  image_url: '',
};
export default ImageEdit;
