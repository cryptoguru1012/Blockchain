import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';
import GaleryItemBrowser from './GaleryItemBrowser';

class ItemBrowser extends React.Component {
	constructor(props) {
		super(props);

		let description = this.props.data.description;
		let isJson = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test( description.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + description + ')');
		let images = [];

		if (isJson) {
			description = JSON.parse(description);
		} else {
			let hasImages = description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g);
			if (hasImages)
				images = hasImages;
		}

		this.state = {
			description: description,
			images: images
		};
	}



	render() {
		return (
			<Row>
				<Col xs={12}>
					<Row>
						<p><strong>{this.props.data.title}</strong><br/>
						<strong>Price:</strong> {this.props.data.currency} {this.props.data.price}</p>
						{typeof this.state.description === 'object' && <VideoPlayer
							url={this.state.description.urlVideo}
							subtitles={this.state.description.subtitlesVideo}
							playOnHover
							hideControls
						/>}
						{this.state.images.length > 0 && <GaleryItemBrowser
							images={this.state.images}
						/>}
					</Row>
				</Col>
			</Row>
		);
	}
}

export default ItemBrowser;
