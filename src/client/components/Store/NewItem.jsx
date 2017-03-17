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

		this.state = {
			subtitles: []
		}

		this.onRecorded = this.onRecorded.bind(this);
	}

	componentWillMount() {
		const self = this;
		fetch('https://raw.githubusercontent.com/smelc/srtcheck/master/tests/test4.shouldpass.srt', {
			headers: {
                'Content-Type': 'text/plain'
            },
			method: 'GET'
		})
		.then(res => res.text())
		.then(res => {
			const subtitles = Parser.fromSrt(res, true);
			self.setState({ subtitles: subtitles });
		});
	}

	onRecorded(blob) {
		const data = new FormData();
		data.append('video', blob, 'videoRecorded.webm');
		fetch('https://shopshot-quangogster.c9users.io/API/parse', {
			method: "POST",
			mode: 'cors',
			body: data
		})
		.then(response => console.log(response))
		.catch(errors => console.log(errors));
	}

	render() {
		if (!this.props.video.isRecorded) {
			return (
				<Grid>
					<VideoRecord onRecorded={this.onRecorded}/>
				</Grid>
			)
		}
		if (this.props.video.isRecorded) {
			return (
				<Grid>
					<VideoPlayer url={this.props.video.url} onDelete={this.props.onDelete}></VideoPlayer>
					<SubtitlesEditer data={this.state.subtitles}></SubtitlesEditer>
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
		// onRecorded: (url) => {
		// 	dispatch(setRecord(url))
		// },
		onDelete: () => {
			dispatch(deleteRecord())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);

