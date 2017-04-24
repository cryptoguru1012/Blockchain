import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Slider from 'react-slick';

class GaleryItemBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.renderSlide = this.renderSlide.bind(this);
		console.log('run GaleryItemBrowser');
	}

	renderSlide() {

		return this.props.images.map((image, i) => {
			return (
				<img style={{width: '100%'}} key={i} src={image} />
			)
		})
	}

	render() {
		const settings = {
      	    dots: true,
      		infinite: true,
      		speed: 500,
      		slidesToShow: 4,
      		slidesToScroll: 1,
      		autoplay: true,
      		autoplaySpeed: 2000
    	};
		return (
			<Row>
				<Col xs={14}>
					<Slider {...settings}>
						<div><img src='http://lorempixel.com/300/300/technics/1' /></div>
        				<div><img src='http://lorempixel.com/300/300/technics/2' /></div>
        				<div><img src='http://lorempixel.com/300/300/technics/3' /></div>
        				<div><img src='http://lorempixel.com/300/300/technics/4' /></div>
        				<div><img src='http://lorempixel.com/300/300/technics/5' /></div>
        				<div><img src='http://lorempixel.com/300/300/technics/6' /></div>
					</Slider>	
				</Col>
			</Row>
		);
	}
}

export default GaleryItemBrowser;

//{this.renderSlide()}
						