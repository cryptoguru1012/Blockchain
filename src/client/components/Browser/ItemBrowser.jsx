import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import VideoPlayer from '../Store/VideoPlayer';
import GaleryItemBrowser from './GaleryItemBrowser';
import { Link } from 'react-router';

let styles = {
	containerItemBrowser: {
		position: 'relative',
		padding: '25% 50%',
		overflow: 'hidden',
		marginTop: '20px'
	},
	contentItemBrowser: {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%'
	},
	infoContainer: {
		position: 'absolute',
		zIndex: '1',
		padding: '20px'
	},
	bgContainer: {
		position: 'absolute',
		width: '100%',
		bottom: '0'
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

		if (isJson(description)) {
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
				<Col xs={12} style={styles.containerItemBrowser} className="containerItemBrowser">
					<Link to={'/offer/' + this.props.data.offer}>
						<div style={styles.contentItemBrowser} className="contentItemBrowser">
							<div className="bgContainer">
								{typeof this.state.description === 'object' && <VideoPlayer
									url={this.state.description.urlVideo}
									subtitles={this.state.description.subtitlesVideo}
									playOnHover
									hideControls
									muted
								/>}
								{this.state.images.length > 0 }
							</div>
						</div>
					</Link>
				</Col>
			</Row>
		);
	}
}

export default ItemBrowser;
