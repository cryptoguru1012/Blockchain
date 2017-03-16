import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';
import Parser from 'subtitles-parser';
import { setSubtitles } from '../../redux/actions/video';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

const styles = {
	subtitlesContainer: {
		position: 'relative',
		height: '300px',
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

var readSrtFile = function(path, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, false);
    rawFile.onreadystatechange = function() {
        if(this.readyState === 4 && (this.status === 200 || this.status == 0)) {
            var data = this.responseText;
            callback(data);
        }
    }
    rawFile.send();
}

var parseTime = function(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subtitles: []
		}

		this.handleEdit = this.handleEdit.bind(this);
	}

	componentWillMount() {
		const self = this;
		readSrtFile('https://raw.githubusercontent.com/smelc/srtcheck/master/tests/test4.shouldpass.srt', function(text) {
			const subtitles = Parser.fromSrt(text, true);
			// self.props.dispatch(setSubtitles(subtitles));
			self.setState({ subtitles: subtitles });
		});
	}

	componentDidMount() {
		console.log(this.state.subtitles);
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
		const subtitles = this.state.subtitles;
		const items = subtitles.map(subtitle =>  
			<table key={subtitle.id} style={styles.table}>
				<tbody>
					<tr>
						<th>start: min {parseTime(subtitle.startTime)}<br/>
						ends: min {parseTime(subtitle.endTime)}</th>
						<th><textarea value={subtitle.text} style={styles.inputText} onChange={(e) => this.handleEdit(e, subtitle)}/></th>
					</tr>
				</tbody>
			</table>
		);
		return (
			<Row>
				<Col xs={12}>
					<div className="subtitles" style={styles.subtitlesContainer}>{items}</div>
				</Col>
			</Row>
		);
	}

}

export default connect()(SubtitlesEditer);
