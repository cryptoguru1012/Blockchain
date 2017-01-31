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
    title: 'SubcategoriesSection'
};

class SubcategoriesSection extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this
            .props
            .showItems()
    }

    render() {
        let rows = [];
        let lastCat = 'null';

        if(this.props.items != null){
            this.props.items.forEach((item) => {
                if(item.category != lastCat ){
                    rows.push(
                        <div key={item.category}> 
                            <h2> {item.category} </h2> 
                        </div>
                        )
                }
            
                lastCat = item.category;
            })
        }
        


        return (
            <section >
                <div>
                    <h2>{this.props.title}</h2>
                    {rows}
                </div>
            </section>
        );
    }
}

SubcategoriesSection.propTypes = propTypes;
SubcategoriesSection.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {items: state.items.list};
}
export default connect(mapStateToProps, {showItems})(SubcategoriesSection);