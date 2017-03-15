import React from 'react';
import {connect} from 'react-redux';

import ReactPlayer from 'react-player';
import Parser from 'subtitles-parser';
import { setSubtitles } from '../../redux/actions/video';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

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

class SubtitlesEditer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subtitles: []
		}
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

	render() {
		const subtitles = this.state.subtitles;
		const items = subtitles.map(subtitle =>  
			<table key={subtitle.id}>
				<tbody>
					<tr>
						<th>{subtitle.startTime} - {subtitle.endTime}</th>
						<th><textarea defaultValue={subtitle.text}/></th>
					</tr>
				</tbody>
			</table>
		);
		return (
			<Row>
				<Col xs={12}>
					<div className="subtitles">{items}</div>
				</Col>
			</Row>
		);
	}

}

export default connect()(SubtitlesEditer);
