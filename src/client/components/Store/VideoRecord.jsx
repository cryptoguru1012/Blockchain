import React from 'react';
import RecordRTC from 'recordrtc';
import Time from './Time';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';
import Dropzone from 'react-dropzone';

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

    this.intervalTrigger;
    this.localStream = null;
    this.audio;
    this.video;
    this.state = {
      open: false,
      counter: 0,
      isRecording: false,
      permissions: {
        audio: true,
        video: true,
      },
      videoOptions: {
        mimeType: 'video/webm',
        bitsPerSecond: 128000,
      },
    };
   
    this.startRecord = this.startRecord.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  componentDidMount() {
    this.video = this.refs.video;
    if (navigator.mediaDevices !== undefined)
      navigator.mediaDevices
        .getUserMedia(this.state.permissions)
        .then(this.successCallback.bind(this))
        .catch(this.errorCallback.bind(this));
    else
      alert('MediaRecorder is not supported by this browser.');
  }

  componentWillUnmount() {
    if (this.localStream !== null) this.localStream.stop();
  }

  successCallback(stream) {
    const video = this.video;
    this.localStream = stream;
    
    window.Video = RecordRTC(this.localStream, this.state.videoOptions);
    video.src = window.URL.createObjectURL(this.localStream);
    video.muted = true;
    video.controls = false;
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
    let data= new FormData();
    
    if (window.Video !== undefined && self.state.isRecording) {
      self.video.pause();
      window.clearInterval(self.intervalTrigger);
      self.setState({ isRecording: false });
      window.Video.stopRecording((url) => {
          let blob = window.Video.blob;
          data.append('video', blob, 'videoRecorded.webm');
          self.props.onRecorded(data, url);
      });

      this.localStream.stop();
    }
  }

  openFileDialog() {
    var fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }
  
  onDrop(file) {
   
    let reader, blob, formData = new FormData();
    
    //reader = new FileReader();
    //reader.readAsDataURL(file[0]);
    //blob = reader.result;
    formData.append('photos', file[0] );

    if( formData.get('photos')['type'].includes("image/") === false
     ) {
      this.setState({open: true});
    } else{
        this.props.imageUploaded( formData );
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
          <Col xs={3} md={2} lg={2}>
            <RaisedButton 
              containerElement='label'
              label="Attach file"
              onClick={ (e) => this.openFileDialog}>
              <Dropzone 
                style={{"display" : "none"}}
                onDrop={ (file) => this.onDrop(file)} />
            </RaisedButton>
          </Col>
          <Col xs={3} md={2} lg={2}>
             <Button className="mui-btn mui-btn--fab">?</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VideoRecord;

