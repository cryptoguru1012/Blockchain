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
		height: '200px',
		overflowY: 'auto',
		maxHeight: '200px',
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
	}
};

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);

		this.renderSubtitles = this.renderSubtitles.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.setState({
			subtitles: this.props.subtitles,
			index: this.props.subtitles.length,
		});
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

	setTimeFormat(value) {
		let chars = value.split('');
		for (let i = 0; i < chars.length; i++) {
			if (i == 2 || i == 5)
				chars[i] = ':';
			else if (i == 8)
				chars[i] = ',';
		}
		return chars.join('');
	}

	handleEdit(event, id) {
		let newSubtitles = this.props.subtitles;

		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === id) {
				if (event.target.name == 'startTime' || event.target.name == 'endTime')
					newSubtitles[i][event.target.name] = this.setTimeFormat(event.target.value);
				else
					newSubtitles[i][event.target.name] = event.target.value;
			}
		}
		this.props.updateSubtitles(newSubtitles);
	}

	handleAdd() {
		let newSubtitles = this.props.subtitles,
			currentId = 0;
		for (var i = 0; i < newSubtitles.length; i++) {
			newSubtitles[i].edit = false;
			currentId = (newSubtitles[i].id > currentId) ? newSubtitles[i].id : currentId;
		}
		let id = parseInt(currentId) + 1
			, subtitle = {
				id: id,
				startTime: '',
				endTime: '',
				text: 'id: ' + id,
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
					<Col xs={5} style={styles.v_center}>
						<FormsyText name="startTime" value={subtitle.startTime} validations="isWords" onChange={(e) => this.handleEdit(e, subtitle.id)} fullWidth multiLine />
						<FormsyText name="endTime" value={subtitle.endTime} validations="isWords" onChange={(e) => this.handleEdit(e, subtitle.id)} fullWidth multiLine />
					</Col>
					<Col xs={7} style={styles.v_center}>
						<FormsyText name="text" value={subtitle.text} validations="isWords" onChange={(e) => this.handleEdit(e, subtitle.id)} fullWidth multiLine />
					</Col>
				</Formsy.Form>
			</Row>
		)
	}

	subtitleEditOff(subtitle) {
		return (
			<Row>
				<Col xs={5} style={styles.v_center}>
					<p>{subtitle.startTime} ->
					<br/>{subtitle.endTime}</p>
				</Col>
				<Col xs={7} style={styles.v_center}>
					<p>{subtitle.text}</p>
				</Col>
			</Row>
		)
	}



	renderSubtitles() {;
		let subtitles = this.props.subtitles;
		subtitles.sort((a,b) => {
			if ( a.startTime < b.startTime )
				return -1;
			if ( a.startTime > b.startTime )
				return 1;
			return 0;
		});
		return subtitles.map(subtitle => {
			return (
				<div key={subtitle.id} onClick={e => this.handleClick(e, subtitle.id)} className={"subtitle-" + subtitle.id}>
					{(subtitle.edit) ? this.subtitleEditOn(subtitle) : this.subtitleEditOff(subtitle)}
					<hr/>
				</div>
			)
		});
	}

	plusIcon() {
    	return <Glyphicon glyph="plus" style={styles.white} />;
  }

  	saveIcon() {
    	return <Glyphicon glyph="floppy-disk" style={styles.white} />;
  }

	render() {
		return (
			<Row className="content-subtitles" style={styles.subtitlesContent}>
				<Col xs={5} style={styles.centerText}>
					<strong>Time</strong>
				</Col>
				<Col xs={7} style={styles.centerText}>
					<strong>Auto-generated subtitles</strong>
				</Col>
				<Col xs={12} className="subtitles" style={styles.subtitlesContainer}>
					<hr/>
					{this.renderSubtitles()}
				</Col>
				<Col xs={5}>
					<RaisedButton
						icon={this.plusIcon()}
						label=" NEW SUBTITLE"
						backgroundColor="#2ab27b"
						labelColor="#fff"
						onClick={this.handleAdd}
						fullWidth={true}
					/>
				</Col>
				<Col xs={5} xsOffset={2}>
					<RaisedButton
						icon={this.saveIcon()}
						label=" SAVE"
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
