import React from 'react';
import { Row } from 'react-bootstrap';
import OfferMap from './Map';

import TableViewItemsBrowser from './TableViewItemsBrowser';
import GridsViewItemsBrowser from './GridsViewItemsBrowser';

require('./styles/list-browser.scss');

class ListBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.getErrorHeader = this.getErrorHeader.bind(this);
	}



	getErrorHeader() {
		const key = this.props.filter;
		let text;

		

		switch(key) {
			case 'SHOW_TEXT':
				text = 'Text';
				break;
			case 'SHOW_PHOTOS':
				text = 'Images';
				break;
			case 'SHOW_VIDEOS':
				text = 'Videos';
				break;
			case 'SHOW_MAP':
				text = 'Map';
				break;
			default:
				text = 'items';
				break;

		}
		return (
			<h3>{'No ' + text + ' to display, you have to perform a new search or just change the filter'}</h3>
		);
	}

	render() {
		return (
			<Row>
				{console.log(this.props.items)}
				{this.props.items.length < 1 && this.getErrorHeader()}
				{this.props.filter === 'SHOW_TEXT' && <TableViewItemsBrowser items={this.props.items} />}
				{this.props.filter === 'SHOW_ALL' && <TableViewItemsBrowser items={this.props.items} media={true} />}
				{(this.props.filter === 'SHOW_VIDEOS' || this.props.filter === 'SHOW_PHOTOS') && <GridsViewItemsBrowser items={this.props.items} />}
				{this.props.filter === 'SHOW_MAP' && <OfferMap items={this.props.items} />}
			</Row>
		)
	}
}

export default ListBrowser;
