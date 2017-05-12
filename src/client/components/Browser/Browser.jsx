import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import { search } from '../../redux/actions/browser';

import FormBrowser from './FormBrowser';
import ListBrowser from './ListBrowser';
import BrowserCarousel from './BrowserCarousel';
import FilterBrowser from './FilterBrowser';
import OrderByBrowser from './OrderByBrowser';

let filterItems = [
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


let orderItems = [
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

class Browser extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let data = {
			regexp: null,
			from: 8,
			safesearch: 'No',
			category: null
		};
		this.props.onSearch(data);
	}

	render() {
		return (
			<div width="100%">
				<Grid>
					<FilterBrowser items={filterItems} />
				</Grid>	
				<BrowserCarousel />		
				<Grid>
					<Col xs={12}>
						<Row>
							<OrderByBrowser items={orderItems} onOrder={this.props.onOrder} />
						</Row>
						<ListBrowser items={this.props.browser.items}/>
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
		onOrder: (order) => {
			dispatch(setOrder(order));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
