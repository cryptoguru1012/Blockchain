import React from 'react';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';

class OfferViewSuccess extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		let data = JSON.parse(this.props.data.description)
			, description = data.text
			, urlVideo = data.urlVideo
			, subtitlesVideo = data.subtitlesVideo

		return (
			<Col xs={12}>
				<h2>{this.props.data.title}</h2>
			</Col>
		);
	}
}

export default OfferViewSuccess;