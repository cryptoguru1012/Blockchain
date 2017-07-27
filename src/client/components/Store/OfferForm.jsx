import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Formsy from 'formsy-react';
import { RaisedButton, MenuItem, Snackbar } from 'material-ui';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import { geolocated } from 'react-geolocated';

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
		this.getDescription = this.getDescription.bind(this);

		// autofill description with subtitles

		this.state = {
			autoDescription: this.getDescription(),
			myLocation: '',
			canSubmit: false
		};

	}

	getDescription() {
		let arrDescription = []
			, subtitles = this.props.subtitlesVideo.sort((a,b) => {
			if ( a.startTime < b.startTime )
				return -1;
			if ( a.startTime > b.startTime )
				return 1;
			return 0;
		});

		subtitles.map(subtitle => {
			arrDescription.push(subtitle.text);
		});

		return arrDescription.join(' ');
	}

	enableButton() {
		this.setState({ canSubmit: true });
	}

	disableButton() {
		this.setState({ canSubmit: false });
	}

	handleSnackbarSuccessRequestClose(reason) {
		if (reason !== 'clickaway' && !this.props.newItem.error) {
			let guid = this.props.newItem.guid;
			window.location = '/offer/' + guid;
		}
	}

	handleSnackbarErrorRequestClose() {
		this.props.showSnackbar();
	}

	handleSubmit(data) {
		let description = {
			text: data.description,
			urlVideo: this.props.urlVideo,
			urlImage: this.props.urlImage,
			subtitlesVideo: this.props.subtitlesVideo
		};
		let payload = {
				alias: 'argvil19',
				category: data.category,
				title: data.name,
				quantity: 1,
				price: parseInt(data.price),
				description: JSON.stringify(description),
				currency: data.currency,
				paymentoptions: data.paymentOptions,
				private: data.certificate
			};
		
		this.props.onCreate(JSON.stringify(payload));
	}

	renderCategories() {
		if (this.props.categories.categories.length > 0) {
			return this.props.categories.categories.map((category, i) => {
				return <MenuItem key={i} value={category.cat} primaryText={category.cat} />
			})
		}
	}

	renderCurrencies() {
		if (this.props.currencies.currencies.length > 0) {
			return this.props.currencies.currencies.map((currency, i) => {
				if (i === 0) {
					return <MenuItem selected default key={i} value={currency.currency} primaryText={currency.currency} />
				}else{
					return <MenuItem key={i} value={currency.currency} primaryText={currency.currency} />
				}
				
			})
		}
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
					<Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={e => this.handleSubmit(e)} >
						<FormsyText
							name="name"
							floatingLabelText="Title"
							hintText="Item title"
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
							name="currency" floatingLabelText="Currency to List in" required fullWidth>
							{this.renderCurrencies()}
						</FormsySelect>
						<FormsySelect name="payment" floatingLabelText="Payment" required fullWidth>
							{this.renderPayments()}
						</FormsySelect>
						<FormsyText
							name="description"
							value={this.state.autoDescription}
							floatingLabelText="Description"
							hintText="Item description"
							validations="isExisty"
							validationError="This field cannot be empty."
							required
							fullWidth
							multiLine
						/>
						<Col xs={6}>
							<FormsyText
								name="latitude"
								value={this.props.coords ? this.props.coords.latitude : ''}
								floatingLabelText="Latitude"
								hintText="Item latitude"
								validations="isNumeric"
								validationError="Only Numbers."
								required
								requiredError="This field is required"
								fullWidth
							/>
						</Col>
						<Col xs={6}>
						<FormsyText
							name="longitude"
							value={this.props.coords ? this.props.coords.longitude : ''}
							floatingLabelText="Longitude"
							hintText="Item longitude"
							validations="isNumeric"
							validationError="Only Numbers."
							required
							requiredError="This field is required"
							fullWidth
						/>
						</Col>
						{
							// <FormsyToggle name="certificate" label="Certificate" />
						}
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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(OfferForm);

