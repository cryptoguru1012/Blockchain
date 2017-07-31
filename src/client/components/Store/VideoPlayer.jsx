import React from 'react';
import { Row, Col, Grid, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';
import Time from './Time';


const styles = {
	white: {
		color: '#fff',
	},
	videoContainer: {
		display: 'relative',
		//marginTop: '5px',
	},
	video: {
		width: '100%',
		display: 'block',
		opacity: 1
	},
	videoBar: {
		position: 'relative',
		display: 'inline-block',
		width: '100%',
		height: '30px',
		backgroundColor: '#e0e0e0',
	},
	statusBar: {
		position: 'absolute',
		top: '0px',
		left: '0px',
		backgroundColor: '#263238',
		width: '0%',
		height: '100%',
	},
	centerRow: {
		margin: 'auto',
		display: 'table',
	},
	colTime: {
		margin: 0,
		padding: 0,
	},
};

class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			play: false,
			duration: 0,
			counter: 0
			
		};

		this.player;
		this.track;
		this.handleVideoPlay = this.handleVideoPlay.bind(this);
		this.handleVideoPause = this.handleVideoPause.bind(this);
		this.handleVideoStop = this.handleVideoStop.bind(this);
		this.updateStatusBar = this.updateStatusBar.bind(this);
		this.setSubtitles = this.setSubtitles.bind(this);
		this.removeSubtitles = this.removeSubtitles.bind(this);
	}

	componentWillUnmount() {
		this.player = false;
	}

/*	generateThumbnail() {
		let self = this;
		const c = document.createElement("canvas");
		const ctx = c.getContext("2d");
		c.width = 160;
		c.height = 90;
		ctx.drawImage(this.player, 0, 0, 160, 90);
		self.player.poster =  c.toDataURL("image/png");

		let dataurl = c.toDataURL();
		document.getElementById('poster').appendChild(c)
	}
*/
	componentDidMount() {
		let self = this, duration = 0;
		this.player = this.refs.player;
		this.player.src = this.props.url+"#t=0.8"//"http://192.168.0.32:8082/hootr/Hootr/59142cff30366323e4aa03b7_20170511150907_133/test.mp4";//
		this.player.type= "video/mp4";
		this.player.muted = (this.props.muted) ? true: false;
        this.player.preload = "auto";
		this.player.controls = false;
		this.player.addEventListener('ended', (e) => {
			self.player && self.setState({ play: false });
		});
		this.player.addEventListener('seeked', function() {
            // self.generateThumbnail();
		}, false);

		this.player.addEventListener('loadeddata', () =>{
			this.player.currentTime = 1
		})

		this.player.addEventListener('loadedmetadata', (e) => {
			self.setSubtitles();
			self.player && self.setState({ duration: self.player.duration });
		});
		this.player.addEventListener('timeupdate', (e) => {
			self.player && self.setState({
				counter: self.player.currentTime,
				duration: self.player.duration
			});
			if (self.refs.statusBar) {
				let percent = self.player.currentTime / self.player.duration;
					// barPercent = self.refs.statusBar.offsetParent.offsetWidth * percent;

				self.refs.statusBar.style.width = `${percent * 100}%`;
			}
		});
	}

	setSubtitles() {
		let self = this;
		// settings subtitles

		if (self.player) {
			self.player.track = self.player.addTextTrack("captions", "English", "en");
			self.player.track.mode = "showing";

			// load subtitles
			self.props.subtitles.map(subtitle => {
				let start = this.setTimetoSeconds(subtitle.startTime)
					, end = this.setTimetoSeconds(subtitle.endTime)
					, newCue = new VTTCue(start, end, subtitle.text, subtitle.id);

					newCue.line = -1;
				self.player.track.addCue(newCue); 
			});
		}
	}

	removeSubtitles() {
		let self = this
			, cues = self.player.track.cues
			, dataCues = [];

		for (var i = 0; i < cues.length; i++)
			dataCues.push(cues[i]);
		for (var i = 0; i < dataCues.length; i++)
			self.player.track.removeCue(dataCues[i]);
	}

	setTimetoSeconds(value) {
		let matchValue = /([0-9]{2}\:[0-9]{2}\:[0-9]{2}\,[0-9]{3})/;

		if (String(value).match(matchValue)) {
			value = value.split(':');
			let h = parseInt(value[0]) * 3600
			, m = parseInt(value[1]) * 60
			, s = parseFloat(value[2].replace(',', '.'));

			return h + m + s;
		}

		return value;
	}

	updateStatusBar(event) {
		let offsetLeft = event.target.offsetLeft,
			clientX = event.clientX;

		this.player.currentTime = this.player.duration *
			((clientX - offsetLeft) / this.refs.statusBar.offsetParent.offsetWidth);
	}

	componentWillReceiveProps(nextProps) {
		let self = this;

		if (!self.player.track)
			return false;
		self.removeSubtitles();
		self.setSubtitles();
	}

	handleVideoPlay() {
		if (this.player) {
			//styles.video.opacity = 1
			this.setState({ play: true });
			this.player.play();
		}
	}

	handleVideoPause() {
		if (this.player) {
			this.setState({ play: false });
			this.player.pause();
		}
	}

	handleVideoStop(e) {
		e.preventDefault();
		if (this.player) {
			this.setState({ 
				play: false,
				counter: 0
			});
			this.player.pause();
			this.player.currentTime = 0;
		}
	}

	playIcon() {
		return <Glyphicon glyph="play" style={styles.white} />;
	}

	pauseIcon() {
		return <Glyphicon glyph="pause" style={styles.white} />;
	}

	deleteIcon() {
		return <Glyphicon glyph="trash" style={styles.white} />;
	}

	renderActionButton() {
		if (!this.state.play) {
			return (
				<RaisedButton
					icon={this.playIcon()}
					backgroundColor="#000"
					labelColor="#fff"
					onClick={this.handleVideoPlay}
					fullWidth
				/>
			);
		}
		return (
			<RaisedButton
				icon={this.pauseIcon()}
				backgroundColor="#000"
				labelColor="#fff"
				onClick={this.handleVideoPause}
				onContextMenu={e => this.handleVideoStop(e)}
				fullWidth
			/>
		);
	}

	renderTime() {
		if (this.state.duration !== Infinity)
			return (
				<Row style={styles.centerRow}>
					<Time value={this.state.counter} />/<Time value={this.state.duration} />
				</Row>
			)
	}

	renderControls() {
		if (this.props.hideControls === undefined)
			return (
				<Col xs={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
					<div style={styles.videoBar} onClick={e => this.updateStatusBar(e)}>
						<div style={styles.statusBar} ref="statusBar" />
					</div>
					<Row>
						<Col xs={3} md={2} lg={2}>
							{this.renderActionButton()}
						</Col>
						<Col xs={6} md={8} lg={8} style={styles.colTime}>
							{this.renderTime()}
						</Col>
						<Col xs={3} md={2} lg={2}>
							{this.props.onDelete && <RaisedButton
								icon={this.deleteIcon()}
								backgroundColor="#eb4d5c"
								labelColor="#fff"
								onClick={this.props.onDelete}
								fullWidth
							/>}
						</Col>
					</Row>
				</Col>
			);
	}

	render() {
		let handleMouseOver = () => false
			, handleMouseLeave = () => false;

		if (this.props.playOnHover) {
			handleMouseLeave = this.handleVideoPause;
			handleMouseOver = this.handleVideoPlay;
		}
		return (
			<Row className="video-component" style={styles.videoContainer}>
				{this.props.fullView && (
					<div>
						<video poster={this.state.poster} ref="player" style={styles.video} onMouseLeave={e => handleMouseLeave(e)} onMouseOver={e => handleMouseOver(e)} onClick={this.handleVideoPlay}>
						</video>
					</div>
				)}
				{!this.props.fullView && (
					<Col xs={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
						<video preload="metadata" poster={this.state.poster} ref="player" style={styles.video} onMouseLeave={e => handleMouseLeave(e)} onMouseOver={e => handleMouseOver(e)} onClick={this.handleVideoPlay}>
						</video>
					</Col>
				)}
				
				{this.renderControls()}
			</Row>
		);
	}
}

export default VideoPlayer;

