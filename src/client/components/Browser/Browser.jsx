import React from 'react';
import { connect } from 'react-redux';
import Config from 'config_env';

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


const filterItems = Config.Browser.filterItems;
const orderItems = Config.Browser.orderItems;

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

/**
 * Class Browser
 *
 * Loads content on home page(Offer listings)
 */
class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      current: 0,
    };
    this.showNextPage = this.showNextPage.bind(this);
    this.showPreviousPage = this.showPreviousPage.bind(this);
    this.itemsReceived = this.itemsReceived.bind(this);
  }

  componentDidMount() {
    this.props.getFeatures();
  }
 
  componentWillReceiveProps(nextProp) {
  }

  itemsReceived(items){
    this.props.browser.items = items;
    this.setState({ items });
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

	/**
	 * @params regexp category
	 * @returns array(offers)
	 */
  showPreviousPage() {
		// go to the previous page
    const item_guid = this.props.browser.dataItems[0];
		 const params = {
   regexp: null,
   from: item_guid.offer,
   safesearch: 'Yes',
   category: null,
 };

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
    let { browser, onOrder } = this.props;
    return (
      <div width="100%">
        {browser.features.length > 0 && <BrowserCarousel items={browser.features} />}
        <Grid>
          {!browser.error && <FilterBrowser items={filterItems} />}
          <Col xs={12}>
            <Sorter newItems={this.itemsReceived} browserFilter={browser.filter} />
            {browser.loading && <CircularProgress size={50} style={styles.spinnerStyle} />}
            {browser.error &&
              <Row>
                <h3>
                  {browser.message}
                </h3>
              </Row>}
            {!browser.error && <ListBrowser items={browser.items} filter={browser.filter} />}
          </Col>
          {browser.filter !== 'SHOW_MAP' &&
            <Col xs={12} style={{ marginBottom: '50px' }}>
              <Col xs={6}>
                {this.state.current > 0 &&
                  <RaisedButton label="previous" onClick={this.showPreviousPage} />}
              </Col>
              <Col xs={6} style={{ float: 'right' }}>
                <RaisedButton label="next" style={{ float: 'right' }} onClick={this.showNextPage} />
              </Col>
            </Col>
          }
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
