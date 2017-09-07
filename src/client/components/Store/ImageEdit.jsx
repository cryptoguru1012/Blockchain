import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col, Glyphicon } from 'react-bootstrap';

const controlsStyle = {
  position: 'relative',
  marginTop: '5%',
};

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
          <img alt="" src={this.props.image_url} width="100%" />
          <Col md={6} style={controlsStyle}>
            {this.props.onDelete &&
              <RaisedButton
                icon={this.deleteIcon()}
                backgroundColor="#eb4d5c"
                labelColor="#fff"
                onClick={this.props.onDelete}
                fullWidth
              />
            }
          </Col>
          <Col md={6} style={controlsStyle}>
            {this.props.onProceed &&
              <RaisedButton
                icon={this.tickIcon()}
                backgroundColor="#3BB885"
                labelColor="#fff"
                onClick={this.props.onProceed}
                fullWidth
              />
            }
          </Col>
        </Col>
      </Row>
    );
  }
}

ImageEdit.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  image_url: PropTypes.string.isRequired,
};

export default ImageEdit;
