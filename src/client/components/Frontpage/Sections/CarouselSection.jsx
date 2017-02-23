import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {Thumbnail, Button, Row, Col, Grid, Carousel} from 'react-bootstrap';
import {Link} from 'react-router';
import Slider from 'react-slick';
import {showItems} from '../../../redux/actions';
//import './Styles/CarouselSection.css';

const propTypes = {
    title: PropTypes.string
};

const defaultProps = {
    title: ''
};

class CarouselSections extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this
            .props
            .showItems()
    }

    // renderItemsCarousel() {
    //     return this
    //         .props
    //         .items
    //         .map((item) => {
    //             return (
    //                 //<div key={item.id}>
    //                     <img key={item.id} className="img-responsive" src={item.url}/>
    //                 //</div>
    //             )
    //         })
    // }

    render() {

        var settings = {
            dots: false,
            fade: true,
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
            pauseOnHover: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            draggable: false,
            swipeToSlide: false
        };

        return (
            <Row>
                <Col md={12} >
                  <Carousel >
                      <Carousel.Item>
                          <img src="http://loremflickr.com/1200/500/bitcoin,computer?ramdom=1" />
                      {/*<Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>*/}
                      </Carousel.Item>
                      <Carousel.Item>
                      <img src="http://loremflickr.com/1200/500/bitcoin,computer?ramdom=2" />
                      {/*}<Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>*/}
                      </Carousel.Item>
                      <Carousel.Item>
                      <img src="http://loremflickr.com/1200/500/bitcoin,computer?ramdom=3" />
                      {/*<Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>*/}
                      </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>


            // <section >
            //     <div className='slider-container'>
            //         <Slider {...settings}>
            //             {this.renderItemsCarousel()}
            //         </Slider>
            //     </div>
            // </section>
        );
    }
}

CarouselSections.propTypes = propTypes;
CarouselSections.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {items: state.items.list};
}
export default connect(mapStateToProps, {showItems})(CarouselSections);
