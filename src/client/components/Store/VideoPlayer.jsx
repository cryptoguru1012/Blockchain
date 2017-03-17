import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

const styles = {
	btn: {
		width: '100%'
	}
};

class VideoPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {play:false};
		this.player;

		this.handleVideoPlay = this.handleVideoPlay.bind(this);
		this.handleVideoPause = this.handleVideoPause.bind(this);
	}

	componentDidMount() {
		const self = this;
		this.player = this.refs.player;
		this.player.src = this.props.url;
		this.player.muted = false;
		this.player.controls = false;
		this.player.addEventListener('ended', e => {
			this.setState({play:false});
		});
	}

	handleVideoPlay(){
		this.setState({play:true});
		this.player.play();
	}

	handleVideoPause(){
		this.setState({play:false});
		this.player.pause();
	}

	renderControls() {
		if (!this.state.play)
			return <Button style={styles.btn} bsSize="large" onClick={this.handleVideoPlay}><Glyphicon glyph="play" /></Button>
		else 
			return <Button style={styles.btn} bsSize="large" onClick={this.handleVideoPause}><Glyphicon glyph="stop" /></Button>
	}

	render() {
		return (
			<Row>
				<Col xs={12}>
					<video ref='player' style={{ width:"100%" }}></video>
				</Col>
				<Col xs={4}>
					{this.renderControls()}
				</Col>
				<Col xs={8}>
					<Button style={styles.btn} bsSize="large" onClick={this.props.onDelete}>RE-RECORD</Button>
				</Col>
			</Row>
		);
	}

}

export default VideoPlayer;
