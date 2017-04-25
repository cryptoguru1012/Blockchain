import React from 'react';

// components
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { FormsySelect } from 'formsy-material-ui/lib';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class OrderByBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderItemsOption = this.renderItemsOption.bind(this);
		this.state = {
			value : ''
		}
	}

	handleSubmit(e) {
		this.setState({
      		value: e.target.value,
    	});
		console.log(e.target);
		this.props.onOrder(e.target.value);
	}

	renderItemsOption() {
		if (this.props.items.length > 0) {
			return this.props.items.map((item, i) => {
				return <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
			})
		}
	}

	render() {
		return (
			<Row>
				<Formsy.Form>
					<Col xs={12}>
						<Row>
							<SelectField 
							fullWidth= {true}
							floatingLabelText="Order by"
							name="item" 
							value={this.state.value}
							 onChange={e => this.handleSubmit(e)}>
								{this.renderItemsOption()}
							</SelectField>
						</Row>
					</Col>
				</Formsy.Form>
			</Row>
		);
	}
}

export default OrderByBrowser;
