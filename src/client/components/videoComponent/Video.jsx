import React from 'react';
import {connect} from 'react-redux';
import {Thumbnail, Button, Row, Col, Grid} from 'react-bootstrap';
import ReactPlayer from 'react-player';


class Video extends React.Component {

  constructor(props) {
    super(props);
    this.state = {play:false};
  }

  onVideo(){
    this.setState({play:true});
  }
  offVideo(){
    this.setState({play:false});
  }

  render() {
    return (
      <div onMouseOver={this.onVideo.bind(this)} onMouseLeave={this.offVideo.bind(this)}>
        <ReactPlayer url={this.props.url} width={this.props.ancho} height={this.props.alto} playing={this.state.play} volume={0} controls={false}/>
      </div>
    );
  }

}

export default Video;
