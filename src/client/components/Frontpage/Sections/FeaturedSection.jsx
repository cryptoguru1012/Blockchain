import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Thumbnail, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Slider from 'react-slick';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { showItems } from '../../../redux/actions';
// import './Styles/CarouselSection.css';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: 'FeaturedSection',
};

const lastCat = '';

class FeaturedSection extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this
            .props
            .showItems();
  }

  renderItemsFeatured() {
    return this
            .props
            .items
            .map((item) => {
              <div className="col-sm-3" key={item.id}>
                <Card>
                  <CardMedia>
                    <img src={item.url3} />
                  </CardMedia>
                  <CardTitle title={item.title} subtitle="{item.price}" />
                </Card>
              </div>;
            });
  }

  render() {
    return (
      <section >
        <div className="row" />
      </section>
    );
  }
}

FeaturedSection.propTypes = propTypes;
FeaturedSection.defaultProps = defaultProps;

function mapStateToProps(state) {
  return { items: state.items.list };
}
export default connect(mapStateToProps, { showItems })(FeaturedSection);
