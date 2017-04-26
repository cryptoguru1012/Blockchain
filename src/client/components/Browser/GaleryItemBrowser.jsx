import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Slider from 'react-slick';

require('./styles/slider.scss');

class GaleryItemBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.renderSlide = this.renderSlide.bind(this);
    // console.log('run GaleryItemBrowser');
  }

  renderSlide() {
    return this.props.images.map((image, i) => (
      <img style={{ width: '100%' }} key={i} src={image} />
    ));
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
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
    return (
      <Row className="slider-container">
        <Col xs={12}>
          <Slider {...settings}>
            <div className="item-slider">
              <img alt="" src="http://lorempixel.com/300/300/technics/1" />
			  <div className="content-slider">
			  	<div className="content-text">
			  		<span className="comment">Test-1</span>
				</div>
			  </div>
            </div>
            <div className="item-slider">
              <img alt="" src="http://lorempixel.com/300/300/technics/2" />
			  <div className="content-slider">
			  	<div className="content-text">
			  		<span className="comment">Test-2</span>
				</div>
			  </div>
            </div>
            <div className="item-slider">
              <img alt="" src="http://lorempixel.com/300/300/technics/3" />
			  <div className="content-slider">
			  	<div className="content-text">
			  		<span className="comment">Test-3</span>
				</div>
			  </div>
            </div>
            <div className="item-slider">
              <img alt="" src="http://lorempixel.com/300/300/technics/4" />
			  <div className="content-slider">
			  	<div className="content-text">
			  		<span className="comment">Test-4</span>
				</div>
			  </div>
            </div>
            <div className="item-slider">
              <img alt="" src="http://lorempixel.com/300/300/technics/5" />
			  <div className="content-slider">
			  	<div className="content-text">
			  		<span className="comment">Test-5</span>
				</div>
			  </div>
            </div>
            <div className="item-slider">
              <img alt="" src="http://lorempixel.com/300/300/technics/6" />
			  <div className="content-slider">
				<div className="content-text">
					<span className="comment">Test-6</span>
				</div>
			  </div>
            </div>
          </Slider>
        </Col>
      </Row>
    );
  }
}

export default GaleryItemBrowser;

// {this.renderSlide()}
