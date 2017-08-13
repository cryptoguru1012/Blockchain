import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Formsy from 'formsy-react';
import { RaisedButton, FlatButton, MenuItem, Snackbar } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import {grey300, grey400, grey500, grey700} from 'material-ui/styles/colors';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { geolocated } from 'react-geolocated';

require ('./style/OfferForm.scss');

const myStyle = {
	spinnerStyle: {
		margin: 'auto',
		display: 'block',
		padding: '5'
	},
	colMargin: {
		margin: '0 -5px 0 -5px'
	}
};

class OfferForm extends React.Component {
	constructor(props) {
		super(props);

		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);
		this.handleSnackbarSuccessRequestClose = this.handleSnackbarSuccessRequestClose.bind(this);
		this.handleSnackbarErrorRequestClose = this.handleSnackbarErrorRequestClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getDescription = this.getDescription.bind(this);
		this.addrHandleChange = this.addrHandleChange.bind(this);
		this.addrHandleSelect = this.addrHandleSelect.bind(this);
		this.latlngToAddress = this.latlngToAddress.bind(this);


		// autofill description with subtitles

		this.state = {
			autoDescription: this.getDescription(),
			canSubmit: false,
			coords: {},
			originCoords: {},
			address: '',
			place_id:'',
			geocodeResults: null,
			addrLoading: false
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
				private: data.certificate,
				geolocation: `${this.state.coords.lat},${this.state.coords.lng}`
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

	addrHandleChange(address) {
    this.setState({
      address,
      geocodeResults: null
		})
	}
	
	addrHandleSelect(address) {
		this.setState({
			address,
			loading: true
		})
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
					coords: {lat: lat, lng: lng},
          geocodeResults: 'success',
          loading: false
        })
      })
      .catch((error) => {
        this.setState({
          geocodeResults: 'error',
          loading: false
        })
			})
  	}	

	latlngToAddress(lat, lng) {
		let geocoder = new google.maps.Geocoder;
		let latlng = {lat: lat, lng: lng};
		geocoder.geocode({'location': latlng}, (results, status) => {
			this.setState({
				coords: {lat: lat, lng: lng},
				address: results[0].formatted_address,
				place_id: results[0].place_id}
				)
		})
	}

	componentWillReceiveProps(props){

		if(props.coords && !props.coords.positionError) {
			this.setState({
				coords: {lat:props.coords.latitude, lng:props.coords.longitude},
				originCoords: {lat:props.coords.latitude, lng:props.coords.longitude}
			});
			this.latlngToAddress(props.coords.latitude, props.coords.longitude);
		}
		else
			fetch('http://ip-api.com/json')
				.then(res => res.json())
				.then((data) => {
					this.setState({
						coords: {lat:data.lat, lng:data.lon},
						originCoords: {lat:data.lat, lng:data.lon}
					})
					this.latlngToAddress(data.lat, data.lon);
				})
		
	}
	render() {
		const cssClasses = {
			root: 'form-group',
			input: 'GeoLoc__search-input',
			autocompleteContainer: 'GeoLoc__autocomplete-container',
		}	

		const addrAutocompleteItem = ({ formattedSuggestion }) => (
				<div className="GeoLoc__suggestion-item" style={{zIndex: 3000}}>
					<FontIcon style={{color: grey700}} className="material-icons  GeoLoc__suggestion-icon">location_on</FontIcon>
					<strong className="mainText">{formattedSuggestion.mainText},</strong>
					<small className="text-muted">{formattedSuggestion.secondaryText}</small>
				</div>)

		const addrInputProps = {
			type: "text",
      value: this.state.address,
      onChange: this.addrHandleChange,
      onBlur: () => {},
      onFocus: () => {},
      autoFocus: false,
      placeholder: "Search Places",
      name: 'GeoLoc__input',
      id: "my-input-id",
		}
		return ( 
			<Row>
				<Row>
					<Col xs={12} className="floatText">
						<span style={{color: grey500}} >Geolocation</span>
					</Col>
					<Col xs={12} md={1}>
						<FlatButton
							backgroundColor={grey300}
							hoverColor={grey400}
							primary={true}
							icon={<FontIcon className="material-icons">gps_fixed</FontIcon>}
							onClick={()=>this.latlngToAddress(this.state.originCoords.lat, this.state.originCoords.lng)}
							title="Current Location"
						/>
					</Col>
					<Col xs={12} md ={11}>
						<PlacesAutocomplete
							onSelect={this.addrHandleSelect}
							autocompleteItem={addrAutocompleteItem}
							onEnterKeyDown={this.addrHandleSelect}
							classNames={cssClasses}
							inputProps={addrInputProps}
						/>
						
					</Col>
				</Row>
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
						<CircularProgress size={50} style={myStyle.spinnerStyle} />
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

