import React from 'react';
import RecordRTC from 'recordrtc';
import Time from './Time';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

const styles = {
  white: {
    color: '#fff',
  },
  colCentered: {
    float: 'none',
    margin: '0 auto',
    width: '100%',
  },
  marginTopVideo: {
    marginTop: '5px',
  },
  centerText: {
    margin: 'auto',
    display: 'table',
  },
};

class VideoRecord extends React.Component {
  constructor(props) {
    super(props);

    const isFirefox = !!navigator.mozGetUserMedia;

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    const WhammyRecorder = RecordRTC.WhammyRecorder;
    this.intervalTrigger;
    this.localStream = null;
    // this.audioURL = null;
    this.video;
    this.audio;
    this.state = {
      counter: 0,
      isRecording: false,
      permissions: {
        audio: true,
        video: true,
      },
      video: {
        type: 'video',
        mimeType: 'video/mp4',
        width: 640,
        height: 480,
        videoBitsPerSecond: 128000,
        recorderType: WhammyRecorder,
      },
      audio: {
        type: 'audio',
        mimeType: 'audio/wav',
        audioBitsPerSecond: 128000,
        recorderType: StereoAudioRecorder,
      },
    };
   
    this.startRecord = this.startRecord.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  componentDidMount() {
    this.video = this.refs.video;
    this.audio = this.refs.audio;
    if (navigator.mediaDevices !== undefined)
      navigator.mediaDevices
        .getUserMedia(this.state.permissions)
        .then(this.successCallback.bind(this))
        .catch(this.errorCallback.bind(this));
    else
      alert('MediaRecorder is not supported by this browser.');
  }

  componentWillUnmount() {
    if (this.localStream !== null) {
      this.localStream.stop();
    }
  }

  successCallback(stream) {
    const video = this.video;
    const audio = this.audio;
    this.localStream = stream;

    window.Video = RecordRTC(this.localStream, this.state.video);
    window.Audio = RecordRTC(this.localStream, this.state.audio);
    video.src = window.URL.createObjectURL(this.localStream);
    audio.src = window.URL.createObjectURL(this.localStream);

    video.muted = true;
    video.controls = false;
    // audio.muted = true;
    // audio.play();
    video.play();
  }

  errorCallback(e) {
    console.log(`Error : ${e.message}`);
  }

  startRecord() {
    const self = this;

    if (window.Video !== undefined && !self.state.isRecording) {
      let counter = 0;
      self.setState({ isRecording: true });

      window.Video.startRecording();
      window.Audio.startRecording();

      self.intervalTrigger = window.setInterval(
        () => {
          counter++;
          self.setState({ counter });
        },
        1000,
      );
    }
  }
    
  saveRecord() {
    const self = this;
    // let formData = new FormData();
    // let data= new FormData();
    
    if (window.Video !== undefined && self.state.isRecording) {
      self.video.pause();
      self.audio.pause();
      window.clearInterval(self.intervalTrigger);
      self.setState({ isRecording: false });
      window.Video.stopRecording((url) => {
        window.Audio.stopRecording();
          let data = new FormData(),
          blob = window.Video.blob,
          blobA = window.Audio.blob;

        // Here result of convert mp4 file
        console.log('THIS IS A CONCOLE LOG (VideoRecordComponent/Line135): "Error for no send to parser"');
        // data.append('video', blob, 'videoRecorded.webm');
        // data.append('audio', blobA, 'audioRecorded.wav');
        self.props.onRecorded(data, url);
      });

      this.localStream.stop();
    }
  }

  

  stopIcon() {
    return <Glyphicon glyph="stop" style={styles.white} />;
  }

  render() {
    return (
      <div style={styles.marginTopVideo}>
        <Row>
          <Col xs={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
            <video ref="video" style={styles.colCentered} />
            <audio ref="audio" style={styles.colCentered} />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3} mdOffset={3} lg={3} lgOffset={3}>
            <RaisedButton
              label="RECORD"
              backgroundColor="#2ab27b"
              labelColor="#fff"
              disabled={this.state.isRecording}
              onClick={this.startRecord}
              fullWidth
            />
          </Col>
          <Col xs={3} md={1} lg={1}>
            <Row style={styles.centerText}>
              <Time value={this.state.counter} />
            </Row>
          </Col>
          <Col xs={3} md={2} lg={2}>
            <RaisedButton
              icon={this.stopIcon()}
              backgroundColor="#eb4d5c"
              labelColor="#fff"
              disabled={!this.state.isRecording}
              onClick={this.saveRecord}
              fullWidth
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default VideoRecord;

