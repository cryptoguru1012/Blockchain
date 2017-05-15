import React from 'react';

import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import FormSelectCategories from '../FormSelectCategories';

class SearchBrowser extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleChangeCategory = this.handleChangeCategory.bind(this);
	}

	handleChangeText(e) {
		this.props.onChangeData({
			type: 'text',
			value: e.target.value
		});
	}

	handleChangeCategory(e, value) {
		this.props.onChangeData({
			type: 'category',
			value: value
		});
	}

	render() {
		return (
			<Formsy.Form 
				style={{marginTop: '10px'}}
				onValid={this.enableButton}
				onInvalid={this.disableButton}
				onValidSubmit={this.handleSubmit}>
				<Row>
					<Col xs={6}>
						<TextField
							name="search"
							onChange={this.handleChangeText}
							value={this.props.regexp}
							hintText="Search"
							inputStyle={{color: '#fff'}}
							hintStyle={{color: '#fff'}}
							style={{display:'block'}}
							fullWidth={true}
						/>
					</Col>
					<Col xs={6}>
						<FormSelectCategories
							name="category"
							onChange={this.handleChangeCategory}
							fullWidth={true}
							hintText="Category"
							labelStyle={{color: '#fff'}}
							menuStyle={{color: '#fff'}}
							hintStyle={{color: '#fff'}}
							style={{display:'block'}}
						/>
					</Col>
				</Row>
			</Formsy.Form>
		);
	}
}

export default SearchBrowser;