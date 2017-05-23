import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';

import { search, getFeatures } from '../../redux/actions/browser';

import FormBrowser from './FormBrowser';
import ListBrowser from './ListBrowser';
import BrowserCarousel from './BrowserCarousel';
import FilterBrowser from './FilterBrowser';
import OrderByBrowser from './OrderByBrowser';

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
	}
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
	}
];

const styles = {
	background: {
		backgroundColor: '#e2e2e2'
	},
	spinnerStyle: {
		margin: 'auto',
		display: 'block',
		padding: 5,
	}
}

class Browser extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let data = {
			regexp: null,
			safesearch: 'No',
			category: null
		};
		this.props.onSearch(data);
		this.props.getFeatures();
	}

	render() {
		return (
			<div width="100%">	
				{this.props.browser.features.length > 0 && <BrowserCarousel items={this.props.browser.features}/>}	
				<Grid>
					{!this.props.browser.error && <FilterBrowser items={filterItems} />}
					<Col xs={12}>
						{!this.props.browser.error && <OrderByBrowser items={orderItems} onOrder={this.props.onOrder} />}
						{this.props.browser.loading && <CircularProgress size={50} style={styles.spinnerStyle} />}
						{this.props.browser.error && <Row><h3>{this.props.browser.message}</h3></Row>}
						{!this.props.browser.error && <ListBrowser items={this.props.browser.items} filter={this.props.browser.filter} />}
					</Col>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	let browser = state.browser;

	return { browser };
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (data) => {
			dispatch(search(data));
		},
		getFeatures: () => {
			dispatch(getFeatures());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
