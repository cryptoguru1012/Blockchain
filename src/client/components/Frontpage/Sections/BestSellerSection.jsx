import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {Thumbnail, Button, Row, Col} from 'react-bootstrap';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {Link} from 'react-router';
import Slider from 'react-slick';
import {showItems} from '../../../redux/actions';
import fonts from "../../fonts/style.css";
import style from './Styles/BestSellerSection.css';

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
      this.props.showItems();
    }

    // renderItemsBestSeller() {
        // return this
        //     .props
        //     .items
        //     .map((item) => {
        //
        //         <div key={item.id}>
        //             <h2> {item.title} </h2>
        //         </div>
        //
        //     })
    // }

  render() {
    let rows = [];
    if(this.props.items != null){
      this.props.items.forEach(item => {
        rows.push(
        <Col md={3} xs={6} key={item.id}>
            <Card >
                <CardMedia overlay={<CardTitle title={item.title} />}>
                  <img src={item.url3} width={320} height={320}/>
                </CardMedia>
            </Card>
        </Col>);
      });
    }
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <div className={style.center}>
                <h2 className={fonts.alfaSlabOne}>{this.props.title}</h2>
                </div>
              <Row> {rows} </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

BestSellerSection.propTypes = propTypes;
BestSellerSection.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {items: state.items.list};
}
export default connect(mapStateToProps, {showItems})(BestSellerSection);
