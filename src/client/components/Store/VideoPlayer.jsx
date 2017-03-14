import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';
import { deleteRecord } from '../../redux/actions/video';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';


class VideoPlayer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {play:false};
		this.player;
	}
	onVideo(){
		this.setState({play:true});
		
	}
	offVideo(){
		this.setState({play:false});
		this.player.seekTo(parseFloat(0));
	}
	rerecord() {
		this.props.dispatch(deleteRecord());
	}
	renderControls() {
		if (!this.state.play)
			return <Button bsSize="large" onClick={this.onVideo.bind(this)}><Glyphicon glyph="play" /></Button>
		else 
			return <Button bsSize="large" onClick={this.offVideo.bind(this)}><Glyphicon glyph="stop" /></Button>
	}
	render() {
		return (
			<div>
				<Row>
					<Col xs={12}>
						<ReactPlayer ref={player => { this.player = player }} url={this.props.url} playing={this.state.play} controls={false}/>
					</Col>
				</Row>
				<Row>
					<Col xs={4}>
						{this.renderControls()}
					</Col>
					<Col xs={8}>
						<Button bsSize="large" onClick={this.rerecord.bind(this)}>{'RE-RECORD'}</Button>
					</Col>
				</Row>
			</div>
		);
	}

}

export default connect()(VideoPlayer);
