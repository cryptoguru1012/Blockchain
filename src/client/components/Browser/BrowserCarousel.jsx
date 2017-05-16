import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Slider from 'react-slick';

require('./styles/slider.scss');

const carouselSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 1000,
	pauseOnHover: true,
	responsive: [
		{
			breakpoint: 426,
			settings: {
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
			},
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
			},
		},
	],
};

class BrowserCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
	}

	renderItem() {
		return this.props.items.map((item, i) => (
			<a key={i} href={item.linkRef}>
				<div className="item-slider">
					<img alt={item.title} src={item.linkMedia.secureUrl} />
					<div className="content-slider">
						<div className="content-text">
							<span className="comment">{item.title}</span>
						</div>
					</div>
				</div>
			</a>
		));
	}

	render() {
		return (
			<Row className="slider-container">
				<Col sm={12}>
					<h2>Featured</h2>   
					<Slider {...carouselSettings}>
						{this.renderItem()}
					</Slider>
				</Col>
			</Row>
		);
	}
}

export default BrowserCarousel;
