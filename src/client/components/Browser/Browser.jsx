import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import { RaisedButton } from 'material-ui';
import { search, getFeatures, setOrder } from '../../redux/actions/browser';
import OfferMap from './Map';
import FormBrowser from './FormBrowser';
import ListBrowser from './ListBrowser';
import BrowserCarousel from './BrowserCarousel';
import FilterBrowser from './FilterBrowser';
import OrderByBrowser from './OrderByBrowser';
import Pagination from './Pagination';
import Sorter from './Sorter';

const filterItems = [
  {
    value: 'SHOW_ALL',
    name: 'All',
  },
  {
    value: 'SHOW_VIDEOS',
    name: 'Videos only',
  },
  {
    value: 'SHOW_PHOTOS',
    name: 'Photos only',
  },
  {
    value: 'SHOW_TEXT',
    name: 'Text only',
  },
  {
    value: 'SHOW_MAP',
    name: 'Map only',
  },
];

const orderItems = [
  {
    value: 'currency',
    name: 'Currency',
  },
  {
    value: 'title',
    name: 'Name',
  },
  {
    value: 'geolocation',
    name: 'Geolocation',
  },
  {
    value: 'paymentoptions_display',
    name: 'Payment options',
  },
  {
    value: 'category',
    name: 'Category',
  },
];

const styles = {
  background: {
    backgroundColor: '#e2e2e2',
  },
  spinnerStyle: {
    margin: 'auto',
    display: 'block',
    padding: 5,
  },
};

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    this.showNextPage = this.showNextPage.bind(this);
    this.showPreviousPage = this.showPreviousPage.bind(this);
  }

  componentDidMount() {
    this.props.getFeatures();
  }

  showNextPage() {
    // go next
    const item_guid = this.props.browser.dataItems.pop();
    const params = {
      from: item_guid.offer,
    };

    this.props.getNextOffers(params);
    this.setState({ current: this.state.current + 1 });
  }

  showPreviousPage() {
    // go to the previous page
    const item_guid = this.props.browser.dataItems[0];
    const params = {
      regexp: null,
      from: item_guid.offer,
      safesearch: 'Yes',
      category: null,
    };

    this.props.getNextOffers(params);
    this.state.current === 0 && this.setState({ current: 0 });
    this.state.current > 0 && this.setState({ current: this.state.current - 1 });
  }

  render() {
    const { browser, onOrder } = this.props;
    return (
      <div width="100%">
        {browser.features.length > 0 && <BrowserCarousel items={browser.features} />}
        <Grid>
          {!browser.error && <FilterBrowser items={filterItems} />}
          <Col xs={12}>
            <Sorter />
            {browser.loading && <CircularProgress size={50} style={styles.spinnerStyle} />}
            {browser.error &&
              <Row>
                <h3>
                  {browser.message}
                </h3>
              </Row>}
            {console.log(browser)}
            {!browser.error && <ListBrowser items={browser.items} filter={browser.filter} />}
          </Col>
          <Col xs={12} style={{ marginBottom: '50px' }}>
            <Col xs={6}>
              {this.state.current > 0 &&
                <RaisedButton label="previous" onClick={this.showPreviousPage} />}
            </Col>
            <Col xs={6} style={{ float: 'right' }}>
              <RaisedButton label="next" style={{ float: 'right' }} onClick={this.showNextPage} />
            </Col>
          </Col>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const browser = state.browser;
  const pages = state.pagination;
  return { browser, pages };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: (data) => {
      dispatch(search(data));
    },
    getFeatures: () => {
      dispatch(getFeatures());
    },
    onOrder: (data) => {
      dispatch(setOrder(data));
    },
    getNextOffers: (params) => {
      dispatch(search(params));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
