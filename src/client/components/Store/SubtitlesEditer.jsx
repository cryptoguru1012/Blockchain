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
		height: '250px',
		overflow: 'scroll',
		margin: '20px 0'
	},
	v_center: {
		display: 'inline-block',
	    verticalAlign: 'middle',
	    float: 'none'
	},
	inputText: {
		width: '100%'
	}
};

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subtitles: [],
			index: 0,
		};

		this.renderSubtitles = this.renderSubtitles.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleEditSubtitle = this.handleEditSubtitle.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.setState({
			subtitles: this.props.subtitles,
			index: this.props.subtitles.length,
		});
	}

	handleEditSubtitle(event, subtitle) {
		let newSubtitles = this.state.subtitles;
		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === subtitle.id)
				newSubtitles[i][event.target.name] = event.target.value;
		}
		this.setState({ subtitles: newSubtitles});
	}

	handleEdit(event, id) {
		let newSubtitles = this.state.subtitles;
		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === id)
				if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'A' )
					return false;
				else
					newSubtitles[i].edit = !newSubtitles[i].edit;
			else
				newSubtitles[i].edit = false;
		}
		this.setState({ subtitles: newSubtitles});
	}

	handleAdd() {
		let newSubtitles = this.state.subtitles
			, id = this.state.index + 1
			, subtitle = {
				id: id,
				startTime: '',
				endTime: '',
				text: 'id: ' + id,
				edit: true
			};

		for (var i = 0; i < newSubtitles.length; i++)
			newSubtitles[i].edit = false;
		
		newSubtitles = newSubtitles.concat([subtitle]);
		this.setState({
			subtitles: newSubtitles,
			index: id
		});
	}

	handleDelete(id) {
		let newSubtitles = this.state.subtitles;
		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === id)
				newSubtitles = newSubtitles.splice(i, 1);
		}
		this.setState({subtitles: newSubtitles});
	}

	subtitleEditOn(subtitle) {
		return (
			<Row>
				<Formsy.Form>
					<Col xs={5} style={styles.v_center}>
						<FormsyText name="startTime" value={subtitle.startTime} validations="isWords" onChange={(e) => this.handleEditSubtitle(e, subtitle)} fullWidth multiLine />
						<FormsyText name="endTime" value={subtitle.endTime} validations="isWords" onChange={(e) => this.handleEditSubtitle(e, subtitle)} fullWidth multiLine />
					</Col>
					<Col xs={7} style={styles.v_center}>
						<FormsyText name="text" value={subtitle.text} validations="isWords" onChange={(e) => this.handleEditSubtitle(e, subtitle)} fullWidth multiLine />
					</Col>
					<Col xs={12}>
						<a onClick={e => this.handleDelete(subtitle.id)} style={{color: '#eb4d5c'}}>Eliminar</a>
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
		return this.state.subtitles.map(subtitle => {
			return (
				<div key={subtitle.id} style={styles.table} onClick={e => this.handleEdit(e, subtitle.id)}>
					{(subtitle.edit) ? this.subtitleEditOn(subtitle) : this.subtitleEditOff(subtitle)}
					<hr/>
				</div>
			)
		});
	}

	render() {
		return (
			<Row className="subtitles" style={styles.subtitlesContent}>
				<Col xs={5}>
					<strong>Time</strong>
				</Col>
				<Col xs={7}>
					<strong>Auto-generated subtitles</strong>
				</Col>
				<Col xs={12} className="subtitles" style={styles.subtitlesContainer}>
					<hr/>
					{this.renderSubtitles()}
				</Col>
				<Col xs={5}>
					<RaisedButton
						label="NEW"
						backgroundColor="#2ab27b"
						labelColor="#fff"
						onClick={this.handleAdd}
						fullWidth={true}
					/>
				</Col>
				<Col xs={5} xsOffset={2}>
					<RaisedButton
						label="SAVE"
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
