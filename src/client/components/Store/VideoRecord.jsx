import React from 'react';
import RecordRTC from 'recordrtc';
import Time from './Time';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

const styles = {
	white: {
		color: '#fff'
	}
};

class VideoRecord extends React.Component {
	constructor(props) {
		super(props);

		this.intervalTrigger;
		this.localStream = null;
		this.video;
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

		this.startRecord = this.startRecord.bind(this);
		this.saveRecord = this.saveRecord.bind(this);
	}

	componentDidMount() {
		this.video = this.refs.video;
		navigator.mediaDevices.getUserMedia(this.state.permissions)
			.then(this.successCallback.bind(this))
			.catch(this.errorCallback.bind(this));
	}

	componentWillUnmount() {
		if (this.localStream !== null)
			this.localStream.stop();
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
		console.log('Error : ' + e.message);
	}

	startRecord() {
		const self = this;

		if (window.Video !== undefined && !self.state.isRecording) {
			let counter = 0;
			self.setState({isRecording: true});
			window.Video.startRecording();
			self.intervalTrigger = window.setInterval(() => {
				counter++;
				self.setState({counter: counter});
			}, 1000);
		}
	}

	saveRecord() {
		const self = this;
		
		if (window.Video !== undefined && self.state.isRecording) {
			self.video.pause();
			window.clearInterval(self.intervalTrigger);
			self.setState({isRecording: false});
			window.Video.stopRecording(url => {
				let data = new FormData()
					, blob = window.Video.blob;
				data.append('video', blob, 'videoRecorded.webm');
				self.props.onRecorded(data, url);
			});

			this.localStream.stop();
		}
	}

	stopIcon() {
		return <Glyphicon glyph="stop" style={styles.white} />
	}

	render() {
		return (
			<Row>
				<Col xs={12}>
					<video ref='video' style={{ width:"100%" }}></video>
				</Col>
				<Col xs={6}>
					<RaisedButton
						label="RECORD"
						backgroundColor="#2ab27b"
						labelColor="#fff"
						disabled={this.state.isRecording}
						onClick={this.startRecord}
						fullWidth
					/>
				</Col>
				<Col xs={3}>
					<Row>
						<Time value={this.state.counter} />
					</Row>
				</Col>
				<Col xs={3}>
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
		);
	}
}

export default VideoRecord;

