import React from 'react';
import { connect } from 'react-redux';
import Parser from 'subtitles-parser';

// redux
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';
import { setRecord, deleteRecord, setOfferForm } from '../../redux/actions/video';

// components
import {Row, Col, Grid, Button} from 'react-bootstrap';
import VideoRecord from './VideoRecord';
import VideoPlayer from './VideoPlayer';
import SubtitlesEditer from './SubtitlesEditer';
import OfferForm from './OfferForm';

class NewItem extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.props.getCategories();
	}

	render() {
		if (this.props.video.isLoading) {
			return (
				<Grid>
					<h1>LOADING...</h1>
				</Grid>
			)
		}
		if (this.props.video.isRecorded && this.props.video.videoUploaded) {
			return (
				<Grid>
					<OfferForm categories={this.props.categories} newItem={this.props.newItem} onCreate={this.props.onCreate} showSnackbar={this.props.showSnackbar}/>
				</Grid>
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
					<SubtitlesEditer data={this.props.video.subtitles} onSave={this.props.onSave}></SubtitlesEditer>
				</Grid>
			)
		}
	}
}

function mapStateToProps(state) {
	const video = state.video;
	const categories = state.categories;
	const newItem = state.newItem;

	return { video, categories, newItem };
}

function mapDispatchToProps(dispatch) {
	return {
		onRecorded: (data, url) => {
			dispatch(setRecord(data, url))
		},
		onDelete: () => {
			dispatch(deleteRecord())
		},
		onSave: () => {
			dispatch(setOfferForm())
		},
		onCreate: (data) => {
			dispatch(doItemCreate(data));
		},
		showSnackbar: () => {
			dispatch(showSnackbar())
		},
		getCategories: () => {
			dispatch(doCategoryReq())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);

