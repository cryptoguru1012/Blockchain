import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';
import GaleryItemBrowser from './GaleryItemBrowser';
import { Link } from 'react-router';

require('./styles/item-browser.scss');

const styles = {
  infoContainer: {
    position: 'absolute',
    zIndex: '1',
    padding: '20px',
  },
  link: {
    color: '#fff',
    textShadow: '1px 1px #000',
    fontSize: '24px',
  },
  currency: {
    color: '#fff',
    textShadow: '1px 1px #000',
  },
};

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

class ItemBrowser extends React.Component {
  constructor(props) {
    super(props);

    const media = JSON.parse(this.props.data.description).media.mediaVault;
    const description = JSON.parse(this.props.data.description).description;
    const images = [];
    const textOnly = false;
    if (media.length > 0) {
      media.map((mediaItem, i) => {
        if (mediaItem.mediaType == 'img') {
          images.push(mediaItem.mediaURL);
        }
      });
    }

    this.state = {
      description,
      images,
      textOnly:
        String(description).indexOf('http') > -1 ||
        String(description.urlVideo).indexOf('http') > -1,
    };
  }

  render() {
    return (
      <Row>
        <Col className="containerItemBrowser">
          <Link to={`/offer/${this.props.data._id}`}>
            <div className="contentItemBrowser">
              <div className="bgContainer">
                {this.state.description.urlVideo &&
                  <VideoPlayer
                    url={this.state.description.urlVideo}
                    subtitles={this.state.description.subtitlesVideo}
                    playOnHover
                    hideControls
                    muted
                  />}
                {this.state.textOnly === false &&
                  <p>
                    {' '}{String(this.state.description)}{' '}
                  </p>}
                <GaleryItemBrowser images={this.state.images} />
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    );
  }
}

export default ItemBrowser;
