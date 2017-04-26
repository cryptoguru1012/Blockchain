import React from 'react';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import FilterLink from './FilterLink';

class FilterBrowser extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let filters = this.props.items.map((filter, i) => {
			return <FilterLink key={i} filter={filter.value}>{filter.name}</FilterLink>
		});
		return (
			<Row>
				<Col xs={6}>
					<br/>
					<center>
						{filters}
					</center>
				</Col>
			</Row>
		)
	}
}

export default FilterBrowser;