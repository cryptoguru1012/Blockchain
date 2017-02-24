import RecordRTC from 'recordrtc';
import React from 'react';
import {
  IconButton,
  FontIcon
} from 'material-ui';


const container_media_buttons = {
    width:"100%",
    textAlign: "center"
}

const styles = {
  recIcon:{
    color:"red",
    width: 48,
    height: 48,
    fontSize:48
  },
  stopIcon:{
    color:"black",
    width: 48,
    height: 48,
    fontSize:48
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  
};
class VideoPanel extends React.Component {
  constructor() {
    super();

    this.state = { permissions: { audio: true, video: true } };
  }

    render() {
        return (
            <div>
                <video ref='video'></video>
                 <div style={ container_media_buttons }>
                    <IconButton
                        iconStyle={styles.recIcon}
                        style={styles.medium}
                        iconClassName="material-icons"
                        tooltip="Start Recording"
                        onClick={() => {
                        const video = this.refs.video;
                        const options = {
                            mimeType: 'video/webm',
                            audioBitsPerSecond: 128000,
                            videoBitsPerSecond: 128000,
                            bitsPerSecond: 128000
                        };

            navigator.mediaDevices.getUserMedia(this.state.permissions).then((stream) => {
              window.Video = RecordRTC(stream, options);
              window.Video.startRecording();

                            video.src = URL.createObjectURL(stream);
                            video.muted = false;
                            video.controls = false;
                            video.play();
                            console.log(video.src);
                        });
                    }}
                    >
                        fiber_manual_record
                    </IconButton>
                    <IconButton
                        iconStyle={styles.stopIcon}
                        style={styles.medium}
                        iconClassName="material-icons"
                        tooltip="Stop Recording"
                        onClick={() => {
                        const comp = this;
                        this.refs.video.pause();
                        
                        window.Video.stopRecording(url => {
                            comp.setState({
                                downloadVideoLink: url
                            });
                        });
                    }}
                    >
                        stop
                    </IconButton>      
                </div>
            </div>
        );
    }
}

export default VideoPanel;

