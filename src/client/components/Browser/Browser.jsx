import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import { setOrder, search } from '../../redux/actions/browser';

import FormBrowser from './FormBrowser';
import OrderByBrowser from './OrderByBrowser';
import ListBrowser from './ListBrowser';
import GaleryItemBrowser from './GaleryItemBrowser';
import FilterBrowser from './FilterBrowser';

let orderItems = [
	{
		value: 'currency',
		name: 'Currency'
	}, 
	{
		value: 'title',
		name: 'Name'
	},
	{
		value: 'geolocation',
		name: 'Geolocation'
	},
	{
		value: 'paymentoptions_display',
		name: 'Payment options'
	},
	{
		value: 'category',
		name: 'Category'
	}
];

let filterItems = [
	{
		value: 'SHOW_ALL',
		name: 'All'
	},
	{
		value: 'SHOW_VIDEOS',
		name: 'Videos only'
	},
	{
		value: 'SHOW_PHOTOS',
		name: 'Photos only'
	},
	{
		value: 'SHOW_TEXT',
		name: 'Text only'
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
			<Grid>
				<Col xs={12}>
					<GaleryItemBrowser />
					<FilterBrowser items={filterItems} />
					<FormBrowser onSearch={this.props.onSearch} browser={this.props.browser} />
					<OrderByBrowser items={orderItems} onOrder={this.props.onOrder}/>
					<ListBrowser items={this.props.browser.items}/>
				</Col>
			</Grid>
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
