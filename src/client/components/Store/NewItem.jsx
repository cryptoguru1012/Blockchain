import React from 'react';
import { connect } from 'react-redux';
import Parser from 'subtitles-parser';

import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';

import { setRecord } from '../../redux/actions/video';
import { deleteRecord } from '../../redux/actions/video';

import {Row, Col, Grid, Button} from 'react-bootstrap';
import VideoRecord from './VideoRecord';
import VideoPlayer from './VideoPlayer';
import SubtitlesEditer from './SubtitlesEditer';

class NewItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.video.isLoading) {
			return (
				<h1>LOADING...</h1>
			)
		}
		if (!this.props.video.isRecorded) {
			return (
				<Grid>
					<VideoRecord onRecorded={this.props.onRecorded}/>
				</Grid>
			)
		}
		else {
			return (
				<Grid>
					<VideoPlayer url={this.props.video.url} onDelete={this.props.onDelete}></VideoPlayer>
					<SubtitlesEditer data={this.props.video.subtitles}></SubtitlesEditer>
				</Grid>
			)
		}
	}
}

function mapStateToProps(state) {
	const video = state.video;

	return { video };
}

function mapDispatchToProps(dispatch) {
	return {
		onRecorded: (data, url) => {
			dispatch(setRecord(data, url))
		},
		onDelete: () => {
			dispatch(deleteRecord())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);

