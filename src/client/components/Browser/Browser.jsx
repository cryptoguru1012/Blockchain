import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import { search, getFeatures } from '../../redux/actions/browser';

import FormBrowser from './FormBrowser';
import ListBrowser from './ListBrowser';
import BrowserCarousel from './BrowserCarousel';
import FilterBrowser from './FilterBrowser';

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
		this.props.getFeatures();
	}

	render() {
		return (
			<div width="100%">	
				{this.props.browser.features.length > 0 && <BrowserCarousel items={this.props.browser.features}/>}	
				<Grid>
					<Col xs={12}>
						<FormBrowser onSearch={this.props.onSearch} 	browser={this.props.browser} />
						<FilterBrowser items={filterItems} />
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
		getFeatures: () => {
			dispatch(getFeatures());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
