import React from 'react';
import Time from './Time';

import { Row, Col, Grid, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

const styles = {
  white: {
    color: '#fff',
  },
  videoContainer: {
    display: 'relative',
    marginTop: '5px',
  },
  video: {
    width: '100%',
    display: 'block',
  },
  videoBar: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
  },
  statusBar: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: '#ff6d00',
    width: '0%',
    height: '100%',
  },
  centerRow: {
    margin: 'auto',
    display: 'table',
  },
  colTime: {
    margin: 0,
    padding: 0,
  },
};

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      duration: 0,
      counter: 0
    };

    this.player;
    this.track;
    this.handleVideoPlay = this.handleVideoPlay.bind(this);
    this.handleVideoPause = this.handleVideoPause.bind(this);
    this.handleVideoStop = this.handleVideoStop.bind(this);
    this.updateStatusBar = this.updateStatusBar.bind(this);
    this.setSubtitles = this.setSubtitles.bind(this);
    this.removeSubtitles = this.removeSubtitles.bind(this);
  }

  componentDidMount() {
    let self = this;
    this.player = this.refs.player;
    this.player.src = this.props.url;
    this.player.muted = false;
    this.player.controls = false;
    this.player.addEventListener('ended', (e) => {
      this.setState({ play: false });
    });
    this.player.addEventListener('loadedmetadata', (e) => {
      // add subtitles
      self.setSubtitles();
      console.log('first added', self.player.track.cues);

      // showing real video duration
      self.setState({ duration: self.player.duration });
    });
    this.player.addEventListener('timeupdate', (e) => {
      this.setState({ counter: this.player.currentTime });
      let percent = this.player.currentTime / this.player.duration,
        barPercent = this.refs.statusBar.offsetParent.offsetWidth * percent;

      this.refs.statusBar.style.width = `${barPercent}px`;
    });
  }

  setSubtitles() {
    let self = this;
    // settings subtitles
    self.player.track = self.player.addTextTrack("captions", "English", "en");
    self.player.track.mode = "showing";

    // load subtitles
    self.props.subtitles.map(subtitle => {
      let start = self.setTimetoSeconds(subtitle.startTime)
        , end = self.setTimetoSeconds(subtitle.endTime)
        , newCue = new VTTCue(start, end, subtitle.text, subtitle.id);

        newCue.line = -1;
      self.player.track.addCue(newCue); 
    });
  }

  removeSubtitles() {
    let self = this
      , cues = self.player.track.cues
      , dataCues = [];

    for (var i = 0; i < cues.length; i++)
      dataCues.push(cues[i]);
    for (var i = 0; i < dataCues.length; i++)
      self.player.track.removeCue(dataCues[i]);
  }

  setTimetoSeconds(value) {
    let output = 0
      , match = value.match(/([0-9]{2}\:[0-9]{2}\:[0-9]{2}\,[0-9]{3})/);

    if (match) {
      value = value.split(':');
      let h = parseInt(value[0]) * 3600
      , m = parseInt(value[1]) * 60
      , s = parseFloat(value[2].replace(',', '.'));

      output = h + m + s;
    }
    return output;
  }

  updateStatusBar(event) {
    let offsetLeft = event.target.offsetLeft,
      clientX = event.clientX;

    this.player.currentTime = this.player.duration *
      ((clientX - offsetLeft) / this.refs.statusBar.offsetParent.offsetWidth);
  }

  componentWillReceiveProps(nextProps) {
    let self = this;

    if (!self.player.track)
      return false;

    console.log('will remove', self.player.track.cues);
    self.removeSubtitles();
    console.log('revoved cues');

    self.setSubtitles();
    console.log('added', self.player.track.cues);
  }

  handleVideoPlay() {
    if (this.player) {
      this.setState({ play: true });
      this.player.play();
    }
  }

  handleVideoPause() {
    if (this.player) {
      this.setState({ play: false });
      this.player.pause();
    }
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

  deleteIcon() {
    return <Glyphicon glyph="trash" style={styles.white} />;
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
      <Row style={styles.videoContainer}>
        <Col xs={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
          <video preload="metadata" ref="player" style={styles.video}>
          </video>
          <div style={styles.videoBar} onClick={e => this.updateStatusBar(e)}>
            <div style={styles.statusBar} ref="statusBar" />
          </div>
        </Col>
        <Col xs={3} md={2} mdOffset={3} lg={2} lgOffset={3}>
          {this.renderControls()}
        </Col>
        <Col xs={6} md={2} lg={2} style={styles.colTime}>
          <Row style={styles.centerRow}>
            <Time value={this.state.counter} />/<Time value={this.state.duration} />
          </Row>
        </Col>
        <Col xs={3} md={2} lg={2}>
          <RaisedButton
            icon={this.deleteIcon()}
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
