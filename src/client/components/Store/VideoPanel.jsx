import RecordRTC from 'recordrtc';
import React from 'react';
import { RaisedButton } from 'material-ui';

class VideoPanel extends React.Component {
  constructor() {
    super();

    this.state = { permissions: { audio: true, video: true } };
  }

  render() {
    return (
      <div>
        <video ref="video" />
        <RaisedButton
          ref="startVideo"
          label="Start recording"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={() => {
            const video = this.refs.video;
            const options = {
              mimeType: 'video/webm',
              audioBitsPerSecond: 128000,
              videoBitsPerSecond: 128000,
              bitsPerSecond: 128000,
            };

            navigator.mediaDevices.getUserMedia(this.state.permissions).then((stream) => {
              window.Video = RecordRTC(stream, options);
              window.Video.startRecording();

              video.src = URL.createObjectURL(stream);
              video.muted = false;
              video.controls = false;
              video.play();
            });
          }}
        />
        <RaisedButton
          label="Stop recording"
          fullWidth
          style={{ marginTop: '20px' }}
          onClick={() => {
            const comp = this;
            this.refs.video.pause();

            window.Video.stopRecording((url) => {
              comp.setState({ downloadVideoLink: url });
            });
          }}
        />
      </div>
    );
  }
}

export default VideoPanel;

