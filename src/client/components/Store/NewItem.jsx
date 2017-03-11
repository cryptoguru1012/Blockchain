import React from 'react';
import { connect } from 'react-redux';

import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';

import {Row, Col, Grid, Button} from 'react-bootstrap';
import VideoRecord from './VideoRecord';
import VideoPlayer from './VideoPlayer';

class NewItem extends React.Component {
	constructor(props) {
		super(props);
	}

	view() {
		if (!this.props.video.isRecorded) {
			return (
				<div>
					<VideoRecord />
				</div>
			)
		}
		if (this.props.video.isRecorded) {
			return (
				<div>
					<VideoPlayer url={this.props.video.url}></VideoPlayer>
				</div>
			)
		}
	}

	render() {
		return ( 
			<Grid>
				{this.view()}
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	const video = state.video;

	return { video };
}

export default connect(mapStateToProps)(NewItem);

