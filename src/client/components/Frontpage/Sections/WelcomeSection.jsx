import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Thumbnail, Button, Row, Col, Grid } from 'react-bootstrap';
import { Link } from 'react-router';
import Slider from 'react-slick';
import { showItems } from '../../../redux/actions';
import style from './Styles/WelcomeSection.css';
import fonts from '../../fonts/style.css';
// import './Styles/CarouselSection.css';

const propTypes = {
  title: PropTypes.string,
};

const defaultProps = {
  title: 'WelcomeSection',
  message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio consequuntur, odio voluptate esse cumque, ab hic, temporibus magnam aliquam animi accusamus! Inventore ab, natus quis placeat. Architecto eligendi rem dolore voluptas, pariatur sed minus accusamus. Nesciunt minima nemo amet vero repudiandae dignissimos consequatur sapiente nisi beatae sed eos, ullam rem, nam. Necessitatibus doloribus et, sequi, accusamus adipisci at quaerat porro fugiat officiis officia sint, doloremque quas. Aliquid labore commodi error eveniet dolorum ipsam natus necessitatibus accusantium obcaecati eum magnam ullam esse, libero perferendis quisquam, fugiat adipisci ea reiciendis non fugit at optio sunt ad vitae. Maxime rerum placeat, officia sapiente suscipit quisquam at quasi et accusantium nam eius illo eveniet hic sequi doloremque architecto, tempore. Adipisci odit officiis qui possimus veniam id, consectetur facere nesciunt non placeat, veritatis aliquid! Quasi minima, vitae. Nam explicabo ratione inventore, velit enim nobis voluptatum optio ullam tenetur quia mollitia quod eveniet culpa facere tempora labore ducimus minus suscipit totam eaque neque voluptas aliquam doloribus. Voluptates reprehenderit, architecto dolorum aut repellat quae quam nulla et laudantium error veritatis officiis inventore facere, qui, repellendus ratione quisquam reiciendis quidem. Hic atque neque, repudiandae distinctio, ea ad labore dignissimos quo recusandae accusamus, libero explicabo quas pariatur debitis sequi.',
};

const section = {
  height: '150px',
  textAlign: 'center',
};

class WelcomeSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col md={12} xs={12}>
          <div className={style.greeting}>
            <h2 className={fonts.alfaSlabOne}>{this.props.title}</h2>
            <p className={fonts.IstokWeb}>{this.props.message}</p>
          </div>
        </Col>
      </Row>
            // <div className="col-lg-12" style={section}>
            //     <h2>{this.props.title}</h2>
            //     <p>{this.props.message}</p>
            // </div>
        );
  }
}

WelcomeSection.propTypes = propTypes;
WelcomeSection.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(WelcomeSection);
