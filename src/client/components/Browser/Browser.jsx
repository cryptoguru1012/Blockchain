import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

import { search } from '../../redux/actions/browser';

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
		this.state = {
	        current: 0
	    };
		this.showNextPage =  this.showNextPage.bind(this);
		this.showPreviousPage =  this.showPreviousPage.bind(this);
	}

	componentDidMount() {
		let data = {
			from: 8
		};
		this.props.onSearch(data);
	}

	showNextPage(){
		// go next
		const item_guid = this.props.browser.dataItems.pop();
		 let params = {
			regexp: null,
			from: item_guid["offer"],
			safesearch: 'Yes',
			category: null
		};

		console.log(params, this.props.getNextOffers);
		this.props.getNextOffers(params);
		this.setState({ current: this.state.current + 1})
	}

	showPreviousPage(){
		// go to the previous page
		const item_guid = this.props.browser.dataItems[0];
		 let params = {
			regexp: null,
			from: item_guid["offer"],
			safesearch: 'Yes',
			category: null
		};

		console.log(params, this.props.getNextOffers);
		this.props.getNextOffers(params);
		this.state.current === 0 && this.setState({ current: 0});
		this.state.current > 0 && this.setState({ current: this.state.current - 1});
	}

	render() {
		return (
			<div width="100%">
				<BrowserCarousel />
				<Grid>
					<Col xs={12}>
						<FormBrowser onSearch={this.props.onSearch} browser={this.props.browser} />
						<FilterBrowser items={filterItems} />
						<ListBrowser items={this.props.browser.items}/>
					</Col>
					<Col xs={12} style={{ 'marginBottom': '50px'}}>
						<Col xs={6}>
							{ this.state.current > 0 && <RaisedButton
								label="previous"
								onClick={this.showPreviousPage} />
							}
						</Col>
						<Col xs={6} style={{'float':'right'}}>
							<RaisedButton
								label="next"
								style={{'float':'right'}}
								onClick={this.showNextPage} />
						</Col>
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
		getNextOffers: (params) => {
			dispatch(search(params));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
