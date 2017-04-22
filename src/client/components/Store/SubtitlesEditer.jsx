import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';
import { setSubtitles } from '../../redux/actions/video';

import { Row, Col, Grid, Glyphicon } from 'react-bootstrap';
import { FormsyText } from 'formsy-material-ui/lib';
import { RaisedButton } from 'material-ui';

const styles = {
	subtitlesContent: {
		padding: '20px 0',
	},
	subtitlesContainer: {
		position: 'relative',
		minHeight: '150px',
		overflowY: 'auto',
		maxHeight: '300px',
		margin: '10px 0',
	},
	v_center: {
		display: 'inline-block',
	    verticalAlign: 'middle',
	    float: 'none',
	},
	inputText: {
		width: '100%'
	},
	form: {
		position: 'relative'
	},
	btnDelete: {
		position: 'absolute',
		top: '-38px',
		right: '15px',
		backgroundColor: '#eb4d5c',
		color: '#fff',
		borderRadius: '50%',
		width: '35px',
		height: '35px',
		padding: '8px 13px'
	},
	white: {
    	color: '#fff',
	},
		centerText: {
		textAlign: 'center',
	},
	even: {
		backgroundColor: '#ccc'
	},
	odd: {
		backgroundColor: '#f2f2f2'
	}
};

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			videoDuration: this.props.videoDuration
		}

		this.renderSubtitles = this.renderSubtitles.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.sortSubtiltes = this.sortSubtiltes.bind(this);
		this.sanitizeSubtitles = this.sanitizeSubtitles.bind(this);
	}

	handleClick(event, id) {
		let newSubtitles = this.props.subtitles;
		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === id)
				if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'A')
					return false;
				else
					newSubtitles[i].edit = !newSubtitles[i].edit;
			else
				newSubtitles[i].edit = false;
		}
		this.props.updateSubtitles(newSubtitles);
	}

	handleEdit(event, id) {
		let newSubtitles = this.sortSubtiltes()
			, target = event.target.name
			, value = event.target.value

		newSubtitles.map((subtitle, i) => {
			if (subtitle.id === id) {
				if (target === 'startTime')
					value = (parseFloat(value)) ? parseFloat(value) : 0;
				subtitle[target] = value;
			}
		})

		this.props.updateSubtitles(newSubtitles);
	}

	setTimeFormat(value) {
		let chars = value.split('');
		for (let i = 0; i < chars.length; i++) {
			if (i == 1)
				chars[i] = '.';
		}
		return chars.join('');
	}

	handleAdd() {
		let newSubtitles = this.props.subtitles
			, currentId = 0;
		for (var i = 0; i < newSubtitles.length; i++) {
			newSubtitles[i].edit = false;
			currentId = (newSubtitles[i].id > currentId) ? newSubtitles[i].id : currentId;
		}
		let id = parseInt(currentId) + 1
			, subtitle = {
				id: id,
				startTime: 0,
				endTime: null,
				text: '',
				edit: true
			};

		newSubtitles = newSubtitles.concat([subtitle]);
		this.props.updateSubtitles(newSubtitles);
	}

	handleDelete(id) {
		let newSubtitles = this.props.subtitles;
		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === id) {
				newSubtitles = newSubtitles.splice(i, 1);
			}
		}
		this.props.updateSubtitles(newSubtitles);
	}

	subtitleEditOn(subtitle) {
		return (
			<Row>
				<Formsy.Form style={styles.form}>
					<a onClick={e => this.handleDelete(subtitle.id)} style={styles.btnDelete}>X</a>
					<Col xs={3} style={styles.v_center}>
						<FormsyText name="startTime" value={String(subtitle.startTime)} validations="isNumeric" onChange={(e) => this.handleEdit(e, subtitle.id)} fullWidth multiLine />
					</Col>
					<Col xs={9} style={styles.v_center}>
						<FormsyText name="text" value={subtitle.text} validations="isWords" onChange={(e) => this.handleEdit(e, subtitle.id)} fullWidth multiLine />
					</Col>
				</Formsy.Form>
			</Row>
		)
	}

	subtitleEditOff(subtitle) {
		return (
			<Row>
				<Col xs={3} style={styles.v_center}>
					<p>{subtitle.startTime} Sec</p>
				</Col>
				<Col xs={9} style={styles.v_center}>
					<p>{subtitle.text}</p>
				</Col>
			</Row>
		)
	}

	sortSubtiltes() {
		return this.props.subtitles.sort((a,b) => {
			if ( a.startTime < b.startTime )
				return -1;
			if ( a.startTime > b.startTime )
				return 1;
			return 0;
		});
	}

	sanitizeSubtitles(subtiltesDuration) {
		return this.sortSubtiltes().map((subtitle, i, subtitles) => {
			if (subtitles.length > 0) {
				if (i == (subtitles.length - 1) ) {
					subtitle.endTime = subtiltesDuration;
				} else {
					subtitle.endTime = subtitles[i+1].startTime;
				}
			}
		});
	}

	renderSubtitles() {
		let subtitles = this.sortSubtiltes();
		return subtitles.map((subtitle, i) => {
			let style;
			if (i%2 == 0)
				style = styles.even;
			else
				style = styles.odd;
			return (
				<div key={subtitle.id} onClick={e => this.handleClick(e, subtitle.id)} className="subtitle" id={"subtitle-" + subtitle.id} style={style}>
					{(subtitle.edit) ? this.subtitleEditOn(subtitle) : this.subtitleEditOff(subtitle)}
				</div>
			)
		});
	}

	plusIcon() {
    	return <Glyphicon glyph="plus" style={styles.white} />;
    }

  	saveIcon() {
    	return <Glyphicon glyph="ok" style={styles.white} />;
	}

	render() {
		this.sanitizeSubtitles(this.state.videoDuration);
		console.log(this.sortSubtiltes());
		return (
			<Row className="content-subtitles" style={styles.subtitlesContent}>
				<Col xs={12} style={styles.centerText}>
					<strong>This is what we heard. You may edit for clarity</strong>
				</Col>
				<Col xs={12} className="subtitles" style={styles.subtitlesContainer}>
					<hr/>
					{this.renderSubtitles()}
					<RaisedButton
						icon={this.plusIcon()}
						label="Add subtitle"
						backgroundColor="#2ab27b"
						labelColor="#fff"
						onClick={this.handleAdd}
						fullWidth={true}
					/>
				</Col>
				<Col xs={3} xsOffset={9} md={2} mdOffset={10} lg={2} lgOffset={10}>
					<RaisedButton
						icon={this.saveIcon()}
						backgroundColor="#2ab27b"
						labelColor="#fff"
						onClick={this.props.onSave}
						fullWidth={true}
					/>
				</Col>
			</Row>
		);
	}

}

export default SubtitlesEditer;
