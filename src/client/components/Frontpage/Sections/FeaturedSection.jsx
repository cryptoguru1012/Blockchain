import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {Thumbnail, Button, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import Slider from 'react-slick';
import {showItems} from '../../../actions';
//import './Styles/CarouselSection.css';

const propTypes = {
    title: PropTypes.string
};

const defaultProps = {
    title: 'FeaturedSection'
};

var lastCat = '';

class FeaturedSection extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this
            .props
            .showItems()
    }

    renderItemsFeatured() {
        return this
            .props
            .items
            .map((item) => {
                var cat = item.category;

                if(cat != lastCat ){
                    return (
                        <div key={item.category}>
                            <h2> {item.category} </h2>
                        </div>
                    )
                    
                    lastCat = cat;
                }

            })
    }

    render() {
        return (
            <section >
                <div>
                    <h2>{this.props.title}</h2>
                </div>
            </section>
        );
    }
}

FeaturedSection.propTypes = propTypes;
FeaturedSection.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {items: state.items.list};
}
export default connect(mapStateToProps, {showItems})(FeaturedSection);