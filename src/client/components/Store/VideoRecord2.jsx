import React from 'react';

import { Row, Col, Grid, Button } from 'react-bootstrap';

import FormData from 'formdata-polyfill';

const styles = {
	wellStyles: {
		width: '330px',
		margin: '0 auto 10px',
	},
	centerStyle: {
		minHeight: '76vh',
		display: 'flex',
		alignItems: 'center',
	},
	input: {
		width: '100px',
		height: '30px',
//		opacity: '0',
		overflow: 'hidden',
//		position: 'absolute',
//		zIndex: '-1'
	},
	label: {
		width: '100%',
		textAlign: 'center',
		fontWeight: '400',
		color: 'white',
		backgroundColor: '#2ab27b',
		padding: '8px 15px',
		display: 'inline-block',
		cursor: 'pointer',
		borderRadius: '2px'
	}
}

class VideoRecord2 extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.refs.newVideo.click();
	}

	handleChange(event) {
		let blob = event.target.files[0]
			, url = URL.createObjectURL(blob)
			, data = new FormData();

		let type = blob.type || "";
		let isVideo = type.startsWith('video/');
		let isImage = type.startsWith('image/');

		data.append('video', blob, 'videoRecorded.mp4');

    isVideo && this.props.onRecorded(data, url);
    isImage && this.props.imageUploaded(data);
	}


	render() {
		return (
			<Row>
				<div style={styles.centerStyle}>
         			<div style={styles.wellStyles}>
						<form encType="multipart/form-data">
							<input onChange={this.handleChange} ref="newVideo" style={styles.input} type="file" id="file" accept="video/*;capture=camcorder"/>
						</form>
					</div>
				</div>
			</Row>
		);
	}
}

export default VideoRecord2;
