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
    title: 'BestSellerSection'
};

var lastCat = '';

class BestSellerSection extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this
            .props
            .showItems()
    }

    renderItemsBestSeller() {
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

BestSellerSection.propTypes = propTypes;
BestSellerSection.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {items: state.items.list};
}
export default connect(mapStateToProps, {showItems})(BestSellerSection);