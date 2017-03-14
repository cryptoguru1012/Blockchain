import RecordRTC from 'recordrtc';
import React from 'react';
import { connect } from 'react-redux';
import { setRecord } from '../../redux/actions/video';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

const styles = {
	container_media_buttons: {
		width:"100%",
		textAlign: "center"
	},
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

class VideoRecord extends React.Component {
	constructor(props) {
		super(props);

		this.intervalTrigger;
		this.state = {
			counter: 0,
			isRecording: false,
			permissions: { 
				audio: true, 
				video: true 
			},
			videoOptions: {
				mimeType: 'video/webm',
				audioBitsPerSecond: 128000,
				videoBitsPerSecond: 128000,
				bitsPerSecond: 128000
			}
		};
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia(this.state.permissions)
			.then(this.successCallback.bind(this))
			.catch(this.errorCallback.bind(this));
	}

	successCallback(stream) {
		const video = this.refs.video;

		window.Video = RecordRTC(stream, this.state.videoOptions);
		video.src = window.URL.createObjectURL(stream);
		video.muted = false;
		video.controls = false;
		video.play();
	}

	errorCallback(e) {
		console.log('Error : ' + e.message);
	}

	startRecord() {
		const self = this;

		if (!self.isRecording) {
			let counter = 0;
			self.isRecording = true;
			window.Video.startRecording();
			self.intervalTrigger = window.setInterval(() => {
				counter++;
				self.setState({counter: counter});
			}, 1000);
		}
	}

	stopRecord() {
		const self = this;
		
		if (window.Video !== undefined && self.isRecording) {
			self.refs.video.pause();
			window.clearInterval(self.intervalTrigger);
			self.setState({isRecording: false});
			window.Video.stopRecording(url => {
				self.props.dispatch(setRecord(url));
			});
		}
	}

	render() {
		return (
			<div>
				<Row>
					<Col xs={12}>
						<div>{this.state.counter}</div>
						<video ref='video' style={{ width:"100%" }}></video>
					</Col>
				</Row>
				<Row>
					<Col xs={8}>
						<Button bsSize="large" onClick={this.startRecord.bind(this)}>RECORD</Button>
					</Col>
					<Col xs={4}>
						<Button bsSize="large" onClick={this.stopRecord.bind(this)}><Glyphicon glyph="stop" /></Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect()(VideoRecord);

