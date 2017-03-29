import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Formsy from 'formsy-react';
import { RaisedButton, MenuItem, Snackbar } from 'material-ui';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

const spinnerStyle = {
	margin: 'auto',
	display: 'block',
	padding: 5
}

class OfferForm extends React.Component {
	constructor(props) {
		super(props);

		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);
		this.handleSnackbarSuccessRequestClose = this.handleSnackbarSuccessRequestClose.bind(this);
		this.handleSnackbarErrorRequestClose = this.handleSnackbarErrorRequestClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			canSubmit: false
		};
	}

	enableButton() {
		this.setState({ canSubmit: true });
	}

	disableButton() {
		this.setState({ canSubmit: false });
	}

	handleSnackbarSuccessRequestClose(reason) {
		if (reason !== 'clickaway' && !this.props.newItem.error) {
			window.location.reload();
		}
	}

	handleSnackbarErrorRequestClose() {
		this.props.showSnackbar();
	}

	handleSubmit(data) {
		const fd = {
			alias: 'argvil19',
			category: data.category,
			title: data.name,
			quantity: 1,
			price: data.price,
			description: data.itemDescription,
			currency: data.currency,
			certguid: '',
			paymentoptions: data.paymentOptions,
			geolocation: '',
			safesearch: '',
			private: data.certificate
		}
		
		this.props.onCreate(JSON.stringify(fd));
	}

	renderCategories() {
		if (this.props.categories.categories.length > 0) {
			return this.props.categories.categories.map(category => {
				return <MenuItem key={category._id} value={category.name} primaryText={category.name} />
			})
		}
	}

	renderCurrencies() {
		return this.props.newItem.currencies.map(currency => {
			return <MenuItem key={currency.id} value={currency.value} primaryText={currency.text} />
		})
	}

	renderPayments() {
		return this.props.newItem.payments.map(payment => {
			return <MenuItem key={payment.id} value={payment.value} primaryText={payment.text} />
		})
	}

	render() {
		return ( 
			<Row>
				<Col xs={12}>
					<Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleSubmit} >
						<FormsyText
							name="name"
							floatingLabelText="Name"
							hintText="Item name"
							validations="isSpecialWords"
							validationError="Please only use letters"
							requiredError="This field is required"
							required
							fullWidth
						/>
						<FormsySelect name="category" floatingLabelText="Category" required fullWidth>
							{this.renderCategories()}
						</FormsySelect>
						<FormsyText
							name="price"
							floatingLabelText="Price"
							hintText="Item price"
							validations="isNumeric"
							validationError="Please provide a number"
							requiredError="This field is required"
							required
							fullWidth
						/>
						<FormsySelect
							name="currency" floatingLabelText="Currency" required fullWidth>
							{this.renderCurrencies()}
						</FormsySelect>
						<FormsySelect name="payment" floatingLabelText="Payment" required fullWidth>
							{this.renderPayments()}
						</FormsySelect>
						<FormsyText
							name="description"
							floatingLabelText="Description"
							hintText="Item description"
							validations="isWords"
							validationError="This field cannot be empty."
							required
							fullWidth
							multiLine
						/>
						<FormsyToggle name="certificate" label="Certificate" />
						{!this.props.newItem.loading &&
							<RaisedButton
								label="Send"
								type="submit"
								primary={false}
								fullWidth
								disabled={!this.state.canSubmit}
							/>
						}
					</Formsy.Form>
					
					{this.props.newItem.loading && !this.props.newItem.success &&
						<CircularProgress size={50} style={spinnerStyle} />
					}
					<Snackbar
						open={this.props.newItem.success}
						message="Success! Item created."
						autoHideDuration={2000}
						onRequestClose={this.handleSnackbarSuccessRequestClose}
					/>
					<Snackbar
						open={this.props.newItem.showSnackbar}
						message={this.props.newItem.message}
						autoHideDuration={2000}
						onRequestClose={this.handleSnackbarErrorRequestClose}
					/>
				</Col>
			</Row>
		);
	}
}

export default OfferForm;

