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
		height: '150px',
		overflow: 'scroll',
		margin: '20px 0'
	},
	table: {
		width: '100%'
	},
	inputText: {
		width: '100%'
	}
};

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subtitles: []
		};

		this.handleEdit = this.handleEdit.bind(this);
	}

	handleEdit(event, subtitle) {
		let newSubtitles = this.state.subtitles;
		for (var i = 0; i < newSubtitles.length; i++) {
			if (newSubtitles[i].id === subtitle.id)
				newSubtitles[i].text = event.target.value;
		}
		newSubtitles = Object.assign([], this.state.subtitles, newSubtitles)
		this.setState({ subtitles: newSubtitles});
	}

	render() {
		const subtitles = this.props.subtitles;
		const items = subtitles.map(subtitle =>  
			<table key={subtitle.id} style={styles.table}>
				<tbody>
					<tr>
						<td>{subtitle.startTime} -> <br/>
						{subtitle.endTime}</td>
						<td>
							<Formsy.Form>
								<FormsyText
									name="subtitle[]"
									value={subtitle.text}
									validations="isWords"
									onChange={(e) => this.handleEdit(e, subtitle)}
									fullWidth
									multiLine
								/>
							</Formsy.Form>
						</td>
					</tr>
				</tbody>
			</table>
		);
		return (
			<Row className="subtitles" style={styles.subtitlesContent}>
				<Col xs={4}>
					<strong>Time</strong>
				</Col>
				<Col xs={8}>
					<strong>Auto-generated subtitles</strong>
				</Col>
				<Col xs={12}>
					<div className="subtitles" style={styles.subtitlesContainer}>
						{items}
					</div>
				</Col>
				<Col xs={4}>
					<RaisedButton
						label="CANCEL"
						backgroundColor="#eb4d5c"
						labelColor="#fff"
						onClick={this.props.onCancel}
					/>
				</Col>
				<Col xs={4} xsOffset={4}>
					<RaisedButton
						label="SAVE"
						backgroundColor="#2ab27b"
						labelColor="#fff"
						onClick={this.props.onSave}
					/>
				</Col>
			</Row>
		);
	}

}

export default SubtitlesEditer;
