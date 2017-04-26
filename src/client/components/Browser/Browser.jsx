import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import { search } from '../../redux/actions/browser';

import FormBrowser from './FormBrowser';
import ListBrowser from './ListBrowser';
import GaleryItemBrowser from './GaleryItemBrowser';
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
	}

	render() {
		return (
			<Grid>
				<Col xs={12}>
					<GaleryItemBrowser />
					<FormBrowser onSearch={this.props.onSearch} browser={this.props.browser} />
					<FilterBrowser items={filterItems} />
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
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
