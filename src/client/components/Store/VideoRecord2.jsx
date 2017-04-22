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
		width: '0.1px',
		height: '0.1px',
		opacity: '0',
		overflow: 'hidden',
		position: 'absolute',
		zIndex: '-1'
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
		console.log("called it");
		this.textInput.focus();
	}


	handleChange(event) {
		let blob = event.target.files[0]
			, url = URL.createObjectURL(blob)
			, data = new FormData();

		data.append('video', blob, 'videoRecorded.mp4');
		this.props.onRecorded(data, url);
	}

	render() {
		return (
			<Row>
				<div style={styles.centerStyle}>
         			<div style={styles.wellStyles}>
         			    <form encType="multipart/form-data">
							<label htmlFor="file" style={styles.label}>CLICK TO RECORD/UPLOAD</label>
							<input onChange={this.handleChange} 
							ref={ (input) => { this.textInput = input; }} style={styles.input} type="file" id="file" accept="video/*;capture=camcorder"/>
						</form>
					</div>
				</div>
			</Row>
		);
	}
}

export default VideoRecord2;
