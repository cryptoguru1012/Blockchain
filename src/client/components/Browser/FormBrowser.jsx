import React from 'react';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import Formsy from 'formsy-react';
import CircularProgress from 'material-ui/CircularProgress';
import { IconButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import Search from 'material-ui/svg-icons/action/search';

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
		let data2 = {};
		if (data.category)
			data2.category = data.category
		// if (data.regexp)
			data2.regexp = data.regexp

		console.log('data ->', data2);
		this.props.onSearch(data2);
	}

	render() {
		return (
			<Row>
				<Formsy.Form onValid={this.enableButton} onInvalid={this.disableButton} onValidSubmit={this.handleSubmit} >
					<Col xs={11} style={styles.align}>
						<Row>
							<FormsyText
								name="regexp"
								floatingLabelText="Search"
								hintText="Search..."
								validations="isSpecialWords"
								validationError="Please only use letters"
								fullWidth
							/>
						</Row>
					</Col>
					<Col xs={1} style={styles.align}>
						<Row>
							{!this.props.browser.loading &&
								<IconButton
									type="submit"
									disabled={!this.state.canSubmit}
								>
									<Search />
								</IconButton>
							}
						</Row>
					</Col>
					<Col xs={12}>
						<Row>
							<FormSelectCategories name="category" label="Category" fullWidth />
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
