import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Thumbnail, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Slider from 'react-slick';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { showItems } from '../../../redux/actions';
import style from './Styles/SubcategoriesSection.css';
import fonts from '../../fonts/style.css';


import Video from '../../videoComponent';
import ReactPlayer from 'react-player';


const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: 'SubcategoriesSection',
};

const button = {
  margin: 12,
};

class SubcategoriesSection extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.showItems();
  }

  render() {
    const rows = [];
    let lastCat = 'null';

    if (this.props.items != null) {
      this.props.items.forEach((item) => {
        if (item.category != lastCat) {
          rows.push(
            <Col md={4} xs={6} key={item.id}>
              <Video url={item.urlVideo} ancho={320} alto={320} />,
                        </Col>,
                        );
        }
        lastCat = item.category;
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
          <Row>
            <Col>
              <RaisedButton label="More categories" primary style={button} />
            </Col>
          </Row>
        </Col>
      </Row>
            /* <section className="col-lg-12">
                <div className="row">
                    <h2>{this.props.title}</h2>
                    {rows}
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <RaisedButton label="More categories" primary={true} style={button} />
                    </div>
                </div>
            </section> */
        );
  }
}

SubcategoriesSection.propTypes = propTypes;
SubcategoriesSection.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { items: state.items.list };
}
export default connect(mapStateToProps, { showItems })(SubcategoriesSection);
