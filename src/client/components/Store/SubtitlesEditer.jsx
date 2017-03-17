import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';
import { setSubtitles } from '../../redux/actions/video';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

const styles = {
	subtitlesContent: {
		padding: '0 0 20px 0',
	},
	subtitlesContainer: {
		position: 'relative',
		height: '250px',
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

var parseTime = function(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);

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
		const subtitles = this.props.data;
		const items = subtitles.map(subtitle =>  
			<table key={subtitle.id} style={styles.table}>
				<tbody>
					<tr>
						<td>start: min {parseTime(subtitle.startTime)}<br/>
						ends: min {parseTime(subtitle.endTime)}</td>
						<td><textarea value={subtitle.text} style={styles.inputText} onChange={(e) => this.handleEdit(e, subtitle)}/></td>
					</tr>
				</tbody>
			</table>
		);
		return (
			<Row>
				<Col xs={12}>
					<div className="subtitles" style={styles.subtitlesContent}>
						<div className="subtitles" style={styles.subtitlesContainer}>
							{items}
						</div>
						<Button>Save</Button>
					</div>
				</Col>
			</Row>
		);
	}

}

export default SubtitlesEditer;
