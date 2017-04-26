import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';
import GaleryItemBrowser from './GaleryItemBrowser';
import { Link } from 'react-router';

require('./styles/item-browser.scss');

let styles = {
	
	infoContainer: {
		position: 'absolute',
		zIndex: '1',
		padding: '20px'
	},
	link: {
		color: '#fff',
		textShadow: '1px 1px #000',
		fontSize: '24px'
	},
	currency: {
		color: '#fff',
		textShadow: '1px 1px #000'
	}
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class ItemBrowser extends React.Component {
	constructor(props) {
		super(props);

		let description = this.props.data.description;
		let images = [];
		let textOnly = false;
		if (isJson(description)) {
			description = JSON.parse(description);
		} else {
			let hasImages = description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g);
			if (hasImages)
				images = hasImages;
		}

		this.state = {
			description: description,
			images: images,
			textOnly: (String(description).indexOf('http') > -1)
		};
	}

	render() {
		return (
			<Row>
				<Col xs={12} className="containerItemBrowser">
					<Link to={'/offer/' + this.props.data.offer}>
						<div className="contentItemBrowser">
							<div className="bgContainer">
								{typeof this.state.description === 'object' && <VideoPlayer
									url={this.state.description.urlVideo}
									subtitles={this.state.description.subtitlesVideo}
									playOnHover
									hideControls
									muted
								/>}
								{ this.state.textOnly === false && <p> {String(this.state.description)} </p>}
								{this.state.images.length > 0 && <GaleryItemBrowser
									images={this.state.images}/>
								}
							</div>
						</div>
					</Link>
				</Col>
			</Row>
		);
	}
}

export default ItemBrowser;