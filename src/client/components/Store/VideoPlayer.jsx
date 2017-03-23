import React from 'react';
import Time from './Time';

import { Row, Col, Grid, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

const styles = {
  white: {
    color: '#fff'
  },
  videoContainer: {
    display: 'relative'
  },
  video: {
    width: '100%',
    display: 'block'
  },
  videoBar: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0'
  },
  statusBar: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: '#ff6d00',
    width: '0%',
    height: '100%'
  }
};

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      duration: 0,
      counter: 0,
    };

    this.player;
    this.subtitleFile;
    this.handleVideoPlay = this.handleVideoPlay.bind(this);
    this.handleVideoPause = this.handleVideoPause.bind(this);
    this.handleVideoStop = this.handleVideoStop.bind(this);
    this.updateStatusBar = this.updateStatusBar.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.player = this.refs.player;
    this.player.src = this.props.url;
    this.player.muted = false;
    this.player.controls = false;
    this.player.addEventListener('ended', (e) => {
      this.setState({ play: false });
    });
    this.player.addEventListener('loadedmetadata', (e) => {
      if (this.player.readyState >= 2) {
      console.log('carga');
      console.log(this.player.duration);
        this.setState({ duration: this.player.duration });
      }
    });
    this.player.addEventListener('timeupdate', (e) => {
      this.setState({ counter: this.player.currentTime });
      let percent = this.player.currentTime / this.player.duration
        , barPercent = this.refs.statusBar.offsetParent.offsetWidth * percent;

      this.refs.statusBar.style.width = barPercent + "px";
    });
    this.subtitleFile = this.generateVttFile(this.jsonToVtt(this.props.subtitles));
  }

  updateStatusBar(event) {
    let offsetLeft = event.target.offsetLeft
      , clientX = event.clientX;

    this.player.currentTime = this.player.duration * ((clientX - offsetLeft) / this.refs.statusBar.offsetParent.offsetWidth);
  }

  jsonToVtt(arr) {
    return arr
      .map(item => `${item.id}\n${(item.startTime).split(',').join('.')} --> ${(item.endTime).split(',').join('.')}\n${item.text}\n`)
      .join('\n');
  }

  generateVttFile(text) {
    let data = new Blob([`WEBVTT FILE \n\n${text}`], { type: 'text/vtt' }),
      file = window.URL.createObjectURL(data);
    return file;
  }

  handleVideoPlay() {
    this.setState({ play: true });
    this.player.play();
  }

  handleVideoPause() {
    this.setState({ play: false });
    this.player.pause();
  }

  handleVideoStop(e) {
    this.setState({ counter: 0 });
    this.player.currentTime = 0;
    e.preventDefault();
  }

  playIcon() {
    return <Glyphicon glyph="play" style={styles.white} />;
  }

  pauseIcon() {
    return <Glyphicon glyph="pause" style={styles.white} />;
  }

  renderControls() {
    if (!this.state.play) {
      return (
        <RaisedButton
          icon={this.playIcon()}
          backgroundColor="#000"
          labelColor="#fff"
          onClick={this.handleVideoPlay}
          fullWidth
        />
      );
    }
    return (
      <RaisedButton
        icon={this.pauseIcon()}
        backgroundColor="#000"
        labelColor="#fff"
        onClick={this.handleVideoPause}
        onContextMenu={e => this.handleVideoStop(e)}
        fullWidth
      />
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12} style={styles.videoContainer}>
          <video
            crossOrigin="anonymous"
            preload="metadata"
            ref="player"
            style={styles.video}
          >
            <track label="English" kind="captions" srcLang="en" src={this.subtitleFile} default />
          </video>
          <div style={styles.videoBar} onClick={e => this.updateStatusBar(e)}>
            <div style={styles.statusBar} ref="statusBar"></div>
          </div>
        </Col>
        <Col xs={3}>
          {this.renderControls()}
        </Col>
        <Col xs={3}>
          <Row>
            <Time value={this.state.counter} />/<Time value={this.state.duration} />
          </Row>
        </Col>
        <Col xs={6}>
          <RaisedButton
            label="RE-RECORD"
            backgroundColor="#eb4d5c"
            labelColor="#fff"
            onClick={this.props.onDelete}
            fullWidth
          />
        </Col>
      </Row>
    );
  }
}

export default VideoPlayer;
