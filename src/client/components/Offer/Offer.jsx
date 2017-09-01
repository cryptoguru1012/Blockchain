import React from 'react';
import { connect } from 'react-redux';

// redux
import { fetchOffer } from '../../redux/actions/sortActions';

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

class Offer extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;
    this.props.fetchOffer(id);
  }

  render() {
    if (!this.props.offer) {
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
    if (this.props.offer) {
      return (
        <Grid>
          <OfferViewSuccess data={this.props.offer} />
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
  const offer = state.sorter.offer;

  return { offer };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOffer: (id) => {
      dispatch(fetchOffer(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
