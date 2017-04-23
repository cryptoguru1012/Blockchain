import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { FormsySelect } from 'formsy-material-ui/lib';
import { MenuItem } from 'material-ui';

class FilterBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderFilterOption = this.renderFilterOption.bind(this);
	}

	handleSubmit(e) {
		console.log(e.target);
		this.props.onFilter(e.target.value);
	}

	renderFilterOption() {
		if (this.props.filters.length > 0) {
			return this.props.filters.map((filter, i) => {
				return <option key={i} value={filter.value}>{filter.name}</option>
			})
		}
	}

	render() {
		return (
			<Row>
				<Formsy.Form>
					<Col xs={12}>
						<Row>
							<select name="filter" onChange={e => this.handleSubmit(e)}>
								<option value="">Filters</option>
								{this.renderFilterOption()}
							</select>
						</Row>
					</Col>
				</Formsy.Form>
			</Row>
		);
	}
}

export default FilterBrowser;
