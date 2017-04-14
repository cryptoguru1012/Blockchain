import React from 'react';
import createFragment from 'react-addons-create-fragment';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';


class OfferViewSuccess extends React.Component {
	constructor(props) {
		super(props);

		let description = this.props.data.description;
		this.state = {
			description: JSON.parse(description)
		}
	}

	render() {
		return (
			<Col xs={12}>
				<h2>{this.props.data.title}</h2>
				<VideoPlayer
					url={this.state.description.urlVideo}
					subtitles={this.state.description.subtitlesVideo}
				/>
			</Col>
		);
	}
}

export default OfferViewSuccess;