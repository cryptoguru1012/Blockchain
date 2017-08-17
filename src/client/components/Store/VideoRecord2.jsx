import React from 'react';

import { Row, Col, Grid, Button } from 'react-bootstrap';

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
		overflow: 'hidden',
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

/**
 * class VideoRecord2
 *
 * Videorecorder for Safari on iPhone
 */
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
		let isVideo = type.includes('video/');
		let isImage = type.includes('image/');

		if(isVideo) {
			data.append('video', blob, 'videoRecorded.mp4');
			this.props.onRecorded(data, url);
		}
		if(isImage) {
			data.append('photos', blob);
			this.props.imageUploaded(data);
		}
    }


	render() {
		return (
			<Row>
				<div style={styles.centerStyle}>
         			<div style={styles.wellStyles}>
						<form encType="multipart/form-data">
							<input onChange={this.handleChange} ref="newVideo" style={styles.input} type="file" id="file" accept="video/*;image/*;capture=camcorder"/>
						</form>
					</div>
				</div>
			</Row>
		);
	}
}

export default VideoRecord2;
