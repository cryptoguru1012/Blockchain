import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { FormsySelect } from 'formsy-material-ui/lib';
import { MenuItem } from 'material-ui';

class OrderByBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderItemsOption = this.renderItemsOption.bind(this);
	}

	handleSubmit(e) {
		console.log(e.target);
		this.props.onOrder(e.target.value);
	}

	renderItemsOption() {
		if (this.props.items.length > 0) {
			return this.props.items.map((item, i) => {
				return <option key={i} value={item.value}>{item.name}</option>
			})
		}
	}

	render() {
		return (
			<Row>
				<Formsy.Form>
					<Col xs={12}>
						<Row>
							<label>Order by: </label> 
							<select name="item" onChange={e => this.handleSubmit(e)}>
								<option value="">options</option>
								{this.renderItemsOption()}
							</select>
						</Row>
					</Col>
				</Formsy.Form>
			</Row>
		);
	}
}

export default OrderByBrowser;
