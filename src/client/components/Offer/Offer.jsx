import React from 'react';
import { connect } from 'react-redux';

// redux
import { getOfferData } from '../../redux/actions/offer';

// components
import { Row, Col, Grid, Button } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import OfferViewSuccess from './OfferViewSuccess';
import OfferViewError from './OfferViewError';

const newItemStyle = {
  loadingDiv: {
    marginTop: '30vh',
    textAlign: 'center',
  },
};

/**
 * class Offer
 *
 * Single offer display
 */
class Offer extends React.Component {
  constructor(props) {
    super(props);
    const guid = this.props.params.id;
    this.props.getData(guid);
  }

  render() {
    if (this.props.offer.loading) {
      return (
        <Grid>
          <Row>
            <Col xs={12} style={newItemStyle.loadingDiv}>
              <center>
          <CircularProgress size={100} thickness={6} />
        </center>
            </Col>
          </Row>
        </Grid>
      );
    }
    if (this.props.offer.error) {
      return (
        <Grid>
          <OfferViewError />
        </Grid>
      );
    }
    if (this.props.offer.success) {
      return (
        <Grid>
          <OfferViewSuccess data={this.props.offer.data} />
        </Grid>
      );
    }
    return (
      <Grid>
        <h1>loading</h1>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const offer = state.offer;

  return { offer };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (guid) => {
      dispatch(getOfferData(guid));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
