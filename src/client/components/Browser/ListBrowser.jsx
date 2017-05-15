import React from 'react';
import { Row } from 'react-bootstrap';

import TableViewItemsBrowser from './TableViewItemsBrowser';
import GridsViewItemsBrowser from './GridsViewItemsBrowser';

require('./styles/list-browser.scss');

class ListBrowser extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Row>
				{this.props.filter === 'SHOW_TEXT' && <TableViewItemsBrowser items={this.props.items} />}
				{this.props.filter === 'SHOW_ALL' && <TableViewItemsBrowser items={this.props.items} media={true} />}
				{this.props.filter !== 'SHOW_TEXT' && this.props.filter !== 'SHOW_ALL' && <GridsViewItemsBrowser items={this.props.items} />}
			</Row>
		)
	}
}

export default ListBrowser;
