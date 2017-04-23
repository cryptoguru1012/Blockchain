import React from 'react';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Formsy from 'formsy-react';
import CircularProgress from 'material-ui/CircularProgress';
import { RaisedButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';

import FormSelectCategories from './../FormSelectCategories'

const styles = {
	spinnerStyle: {
		margin: 'auto',
		display: 'block',
		padding: 5
	},
	align: {
	    verticalAlign: 'middle',
	    display: 'inline-block',
	    float: 'none'
	}
}

class FormBrowser extends React.Component {
	constructor(props) {
		super(props);

		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);
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

	handleSubmit(data) {
		console.log('data---->', data);
		this.props.onSearch(data);
	}

	render() {
		return (
			<Row>
				<Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleSubmit} >
					<Col xs={8} style={styles.align}>
						<Row>
							<FormsyText
								name="regexp"
								floatingLabelText="Search"
								hintText="Search..."
								validations="isSpecialWords"
								validationError="Please only use letters"
								requiredError="This field is required"
								required
								fullWidth
							/>
						</Row>
					</Col>
					<Col xs={4} style={styles.align}>
						<Row>
							{!this.props.browser.loading &&
								<RaisedButton
									label="Search"
									type="submit"
									disabled={!this.state.canSubmit}
									fullWidth
								/>
							}
						</Row>
					</Col>
					<Col xs={12}>
						<Row>
							<FormSelectCategories name="category" label="Category" required fullWidth />
						</Row>
					</Col>
					{this.props.browser.loading &&
						<CircularProgress size={50} style={styles.spinnerStyle} />
					}
				</Formsy.Form>
			</Row>
		);
	}
}

export default FormBrowser;
