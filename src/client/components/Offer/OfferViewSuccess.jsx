import React from 'react';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';
require('./styles/style.css');

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class OfferViewSuccess extends React.Component {
	constructor(props) {
		super(props);

		let description = this.props.data.description;
		this.state = {
			description: (isJson(description)) ? JSON.parse(description) : description
		}
	}

	rendeDescription() {
		return <p>{this.state.description}</p>
	}

	render() {
		return (
			<Col xs={12}>
				<h2>{'Title: ' + this.props.data.title}</h2>
				<h3>{'Price: ' + this.props.data.price + ' ' + this.props.data.currency}</h3>
				<h4> {'Quantitiy :' + this.props.data.quantity }</h4>
				{ this.state.description.urlVideo && isJson(this.props.data.description) && <VideoPlayer
					url={this.state.description.urlVideo}
					subtitles={this.state.description.subtitlesVideo}
				/> }
				{ this.state.description.urlImage && isJson(this.props.data.description) && 	<img height="400" width="400"
					src={this.state.description.urlImage || " "}
				/> }
				{ !isJson(this.props.data.description) && this.rendeDescription()}

			</Col>
		);
	}
}

export default OfferViewSuccess;
