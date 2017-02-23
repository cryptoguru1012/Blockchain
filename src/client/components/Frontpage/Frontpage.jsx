import React from 'react';
import {connect} from 'react-redux';
import {Thumbnail, Button, Row, Col, Grid} from 'react-bootstrap';

//import ItemsList from './ItemsList';
import CarouselSection from './Sections/CarouselSection';
import WelcomeSection from './Sections/WelcomeSection';
import SubcategoriesSection from './Sections/SubcategoriesSection';
import FeaturedSection from './Sections/FeaturedSection';
import BestSellerSection from './Sections/BestSellerSection';

const mainStyle = {
  width: '100%',
  padding: 0,
  marginTop:'70px'
};

class Frontpage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={mainStyle} >
          <Grid>
             <CarouselSection/>
             {/*<WelcomeSection/>*/}
             <SubcategoriesSection/>
             <FeaturedSection/>
             <BestSellerSection/>
          </Grid>
      </div>
      // <div className="container" style={mainStyle}>
      //   <div>
      //     <CarouselSection/>
      //   </div>
      //   <div>
      //     <WelcomeSection/>
      //     <SubcategoriesSection/>
      //     <FeaturedSection/>
      //     <BestSellerSection/>
      //   </div>
      // </div>
    );
  }

}

export default connect()(Frontpage);
