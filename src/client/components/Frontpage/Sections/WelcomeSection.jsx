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
    title: 'WelcomeSection'
};

class WelcomeSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <h2>{this.props.title}</h2>
                </div>
        );
    }
}

WelcomeSection.propTypes = propTypes;
WelcomeSection.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps)(WelcomeSection);