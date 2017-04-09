import React from 'react';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import ItemBrowser from './ItemBrowser';

class ListBrowser extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let items = this.props.items.map((item) => {
			return <ItemBrowser key={item.guid} data={item}/>
		});
		return (
			<Row>
				<Col xs={12}>
					{items}
				</Col>
			</Row>
		);
	}
}

export default ListBrowser;
