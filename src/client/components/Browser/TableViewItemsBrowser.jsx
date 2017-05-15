import React from 'react';
import { Link } from 'react-router';

import VideoPlayer from '../Store/VideoPlayer'

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const styles = {
	imageContainer: function(url) {
		return {
			width: '100px',
			height: '100px',
			marginRight: '20px',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundColor: '#000',
			backgroundImage: url
		}
	},
	videoContainer: {
		width: '100px',
		height: '100px',
		overflow: 'hidden',
		backgroundColor: '#000',
		position: 'relative'
	},
	video: {
		transform: 'translate(-50%, -50%)',
		position: 'absolute',
		top: '50%',
		left: '50%',
		width: '100%',
		height: '100%'
	}
}

class TableViewItemsBrowser extends React.Component {
	constructor(props) {
		super(props);

		this.getMedia = this.getMedia.bind(this);
	}

	getMedia(description) {
		if (isJson(description)) {
			description = JSON.parse(description);
			return {
				type: 'video',
				value: description
			}
		} else {
			let hasImages = description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g);
			if (hasImages) {
				return {
					type: 'image',
					value: hasImages[0]
				}
			} else {
				return false;
			}
		}
	}

	renderMedia(data) {
		if (data.type === 'video') {
			return (
				<div style={styles.videoContainer}>
					<VideoPlayer 
					style={styles.video}
					url={data.value.urlVideo}
					subtitles={data.value.subtitlesVideo}
					playOnHover
					hideControls
					muted/>
				</div>
			)
		}
		else {
			const url = `url(${data.value})`
			return (
				<div style={styles.imageContainer(url)}>
				</div>	
			)
		}
	}

	render() {
		const items = this.props.items.map((item) => {
			const mediaData = this.getMedia(item.description);
			return (
				<tr key={item.txid}>
					{this.props.media && <th>{this.renderMedia(mediaData)}</th>}
					<td><Link to={'/offer/' + item.offer}>{item.title}</Link></td>
					<td>{item.vendor}</td> 
					<td>{item.price}</td>
					<td>{item.currency}</td>
				</tr>
			);
		});
		return (
			<table className="grids">
				<thead>
					<tr>
						{this.props.media && <th>Media</th>}
						<th>Title</th>
						<th>Vendor</th> 
						<th>Price</th>
						<th>Currency</th>
					</tr>
				</thead>
				<tbody>
					{items}
				</tbody>
			</table>
		);
	}
}

export default TableViewItemsBrowser;